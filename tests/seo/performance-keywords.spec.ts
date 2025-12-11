import { expect, test } from '@playwright/test'

test.describe('Performance & Core Web Vitals Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Performance Metrics - Google Core Web Vitals', () => {
    test('should have acceptable Largest Contentful Paint (LCP)', async ({
      page,
    }) => {
      const lcp = await page.evaluate(() => {
        return new Promise<number>(resolve => {
          let resolved = false
          const observer = new PerformanceObserver(list => {
            if (resolved) return
            const entries = list.getEntries()
            const lastEntry = entries[
              entries.length - 1
            ] as PerformanceEntry & {
              renderTime?: number
              loadTime?: number
            }
            const lcpValue = lastEntry.renderTime || lastEntry.loadTime || 0
            if (lcpValue > 0) {
              resolved = true
              observer.disconnect()
              resolve(lcpValue)
            }
          })
          observer.observe({ type: 'largest-contentful-paint', buffered: true })

          setTimeout(() => {
            if (!resolved) {
              observer.disconnect()
              resolve(-1)
            }
          }, 5000)
        })
      })

      expect(lcp).toBeGreaterThan(0)
      expect(lcp).toBeLessThan(2500)
    })

    test('should have acceptable Cumulative Layout Shift (CLS)', async ({
      page,
    }) => {
      await page.waitForLoadState('networkidle')

      const cls = await page.evaluate(() => {
        return new Promise<number>(resolve => {
          let clsValue = 0
          new PerformanceObserver(list => {
            for (const entry of list.getEntries()) {
              if ((entry as any).hadRecentInput) continue
              clsValue += (entry as any).value
            }
          }).observe({ type: 'layout-shift', buffered: true })

          setTimeout(() => resolve(clsValue), 3000)
        })
      })

      expect(cls).toBeLessThan(0.1)
    })

    test('should have acceptable First Contentful Paint (FCP)', async ({
      page,
    }) => {
      const fcp = await page.evaluate(() => {
        const fcpEntry = performance
          .getEntriesByType('paint')
          .find(entry => entry.name === 'first-contentful-paint')
        return fcpEntry?.startTime ?? -1
      })

      expect(fcp).toBeGreaterThan(0)
      expect(fcp).toBeLessThan(1800)
    })

    test('should have acceptable DOM Interactive Time', async ({ page }) => {
      const domInteractive = await page.evaluate(() => {
        const navigationTiming = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming
        return navigationTiming.domInteractive
      })

      expect(domInteractive).toBeLessThan(3800)
    })
  })

  test.describe('Resource Loading', () => {
    test('should not have render-blocking resources', async ({ page }) => {
      const renderBlockingResources = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('link'))

        return links.filter(link => {
          const rel = link.rel || ''
          const asAttribute = link.getAttribute('as')
          const media = link.getAttribute('media')

          const isStylesheet = rel.includes('stylesheet')

          if (!isStylesheet) {
            return false
          }

          const isPreloaded = rel.includes('preload') && asAttribute === 'style'

          const hasNonRenderBlockingMedia =
            media !== null &&
            media.trim() !== '' &&
            (media.includes('print') || media.includes('('))

          const isRenderBlocking = !isPreloaded && !hasNonRenderBlockingMedia

          return isRenderBlocking
        }).length
      })

      expect(renderBlockingResources).toBeLessThanOrEqual(2)
    })

    test('images should use modern formats (WebP, AVIF)', async ({ page }) => {
      const images = await page.locator('img').all()
      let modernFormatCount = 0

      for (const img of images) {
        const src = await img.getAttribute('src')
        if (src && (src.includes('.webp') || src.includes('.avif'))) {
          modernFormatCount++
        }
      }

      if (images.length > 0) {
        const modernFormatPercentage = (modernFormatCount / images.length) * 100
        expect(modernFormatPercentage).toBeGreaterThan(50)
      }
    })

    test('images should have width and height attributes', async ({ page }) => {
      const images = await page.locator('img').all()

      for (const img of images) {
        const width = await img.getAttribute('width')
        const height = await img.getAttribute('height')
        const style = await img.getAttribute('style')

        const hasDimensions =
          (width && height) ||
          (style && (style.includes('width') || style.includes('height')))

        expect(hasDimensions).toBeTruthy()
      }
    })

    test('should implement lazy loading for below-fold images', async ({
      page,
    }) => {
      const images = await page.locator('img').all()
      let lazyLoadCount = 0

      for (const img of images.slice(3)) {
        const loading = await img.getAttribute('loading')
        if (loading === 'lazy') {
          lazyLoadCount++
        }
      }

      if (images.length > 3) {
        expect(lazyLoadCount).toBeGreaterThan(0)
      }
    })
  })

  test.describe('JavaScript Performance', () => {
    test('should not have excessive DOMContentLoaded handler execution time', async ({
      page,
    }) => {
      const domContentLoadedDuration = await page.evaluate(() => {
        const navigationTiming = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming
        return (
          navigationTiming.domContentLoadedEventEnd -
          navigationTiming.domContentLoadedEventStart
        )
      })

      expect(domContentLoadedDuration).toBeLessThan(1000)
    })

    test('should not have long tasks', async ({ page }) => {
      await page.waitForLoadState('networkidle')

      const longTasks = await page.evaluate(() => {
        return new Promise<number>(resolve => {
          const tasks: number[] = []
          new PerformanceObserver(list => {
            for (const entry of list.getEntries()) {
              tasks.push(entry.duration)
            }
          }).observe({ type: 'longtask', buffered: true })

          setTimeout(() => resolve(tasks.length), 3000)
        })
      })

      expect(longTasks).toBeLessThanOrEqual(3)
    })
  })

  test.describe('Network Performance', () => {
    test('should use HTTP/2 or HTTP/3', async ({ page }) => {
      const protocol = await page.evaluate(() => {
        const navigationEntry = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming & { nextHopProtocol?: string }
        return navigationEntry.nextHopProtocol
      })

      expect(protocol).toMatch(/h2|h3/)
    })

    test('should have acceptable page load time', async ({ page }) => {
      const loadTime = await page.evaluate(() => {
        const navigationTiming = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming
        return navigationTiming.loadEventEnd - navigationTiming.fetchStart
      })

      expect(loadTime).toBeLessThan(3000)
    })
  })

  test.describe('Mobile Performance', () => {
    test('should be responsive on mobile devices', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const isResponsive = await page.evaluate(() => {
        return document.documentElement.scrollWidth <= window.innerWidth
      })

      expect(isResponsive).toBeTruthy()
    })

    test('should have touch-friendly interactive elements', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const buttons = await page.locator('button, a').all()

      for (const button of buttons.slice(0, 5)) {
        const box = await button.boundingBox()
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44)
        }
      }
    })
  })
})

test.describe('SEO Content Quality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Content Depth and Quality', () => {
    test('main content should have substantial text', async ({ page }) => {
      const mainContent = await page.locator('main').textContent()
      const wordCount = mainContent?.split(/\s+/).filter(Boolean).length || 0

      expect(wordCount).toBeGreaterThan(300)
    })

    test('should have unique content per page', async ({ page }) => {
      const mainContent = await page.locator('main').textContent()
      const headerContent = await page.locator('header').textContent()
      const footerContent = await page.locator('footer').textContent()

      const mainWordCount =
        mainContent?.split(/\s+/).filter(Boolean).length || 0
      const totalWordCount = (
        (mainContent || '') +
        (headerContent || '') +
        (footerContent || '')
      )
        .split(/\s+/)
        .filter(Boolean).length

      expect(totalWordCount).toBeGreaterThan(0)
      const mainContentPercentage = (mainWordCount / totalWordCount) * 100
      expect(mainContentPercentage).toBeGreaterThan(60)
    })

    test('should have relevant internal linking', async ({ page }) => {
      const internalLinks = await page
        .locator('a[href^="/"], a[href^="#"]')
        .count()

      expect(internalLinks).toBeGreaterThan(5)
    })

    test('should not have broken internal links', async ({ page }) => {
      const internalLinks = await page
        .locator('a[href^="/"], a[href^="#"]')
        .all()

      for (const link of internalLinks) {
        const href = await link.getAttribute('href')
        expect(href).not.toBe('#')
        expect(href).toBeTruthy()
      }
    })
  })

  test.describe('Keyword Optimization', () => {
    test('primary keywords should appear in h1', async ({ page }) => {
      const h1Text = await page.locator('h1').first().textContent()
      const primaryKeywords = ['EMR', 'Internacional', 'APH', 'Tático']

      const hasKeyword = primaryKeywords.some(keyword =>
        h1Text?.toLowerCase().includes(keyword.toLowerCase())
      )

      expect(hasKeyword).toBeTruthy()
    })

    test('keywords should appear naturally in content', async ({ page }) => {
      const content = await page.locator('main').textContent()
      const keywords = [
        'atendimento pré-hospitalar',
        'emergência',
        'tático',
        'treinamento',
        'curso',
      ]

      let keywordCount = 0
      for (const keyword of keywords) {
        const regex = new RegExp(keyword, 'gi')
        const matches = content?.match(regex)
        keywordCount += matches?.length || 0
      }

      expect(keywordCount).toBeGreaterThan(5)
      expect(keywordCount).toBeLessThan(30)
    })

    test('should have keyword-rich section headings', async ({ page }) => {
      const headings = await page.locator('h2, h3').all()
      let keywordHeadings = 0

      const keywords = ['emergência', 'tático', 'curso', 'treinamento', 'APH']

      for (const heading of headings) {
        const text = await heading.textContent()
        const hasKeyword = keywords.some(keyword =>
          text?.toLowerCase().includes(keyword.toLowerCase())
        )
        if (hasKeyword) keywordHeadings++
      }

      expect(keywordHeadings).toBeGreaterThan(2)
    })
  })

  test.describe('Structured Data', () => {
    test('should have structured data markup', async ({ page }) => {
      const jsonLd = await page
        .locator('script[type="application/ld+json"]')
        .count()

      expect(jsonLd).toBeGreaterThan(0)
    })

    test('structured data should be valid JSON', async ({ page }) => {
      const jsonLdElements = await page
        .locator('script[type="application/ld+json"]')
        .all()

      for (const element of jsonLdElements) {
        const content = await element.textContent()

        expect(content).not.toBeNull()
        expect(content).toBeTruthy()

        expect(() => JSON.parse(content!)).not.toThrow()
      }
    })

    test('should have organization schema', async ({ page }) => {
      const jsonLdElements = await page
        .locator('script[type="application/ld+json"]')
        .all()

      let hasOrgSchema = false
      for (const element of jsonLdElements) {
        const content = await element.textContent()

        if (!content || content.trim().length === 0) {
          continue
        }

        try {
          const data = JSON.parse(content)
          if (
            data['@type'] === 'Organization' ||
            data['@type']?.includes('Organization')
          ) {
            hasOrgSchema = true
            break
          }
        } catch {
          continue
        }
      }

      expect(hasOrgSchema).toBeTruthy()
    })
  })

  test.describe('URL Structure', () => {
    test('URL should be descriptive and clean', async ({ page }) => {
      const url = page.url()
      expect(url).not.toContain('?id=')
      expect(url).not.toContain('&')
      expect(url).not.toMatch(/\d{5,}/)
    })

    test('URL should use HTTPS', async ({ page }) => {
      const url = page.url()
      expect(url).toMatch(/^https:\/\//)
    })
  })
})
