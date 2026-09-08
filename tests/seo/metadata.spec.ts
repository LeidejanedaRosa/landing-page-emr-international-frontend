import { expect, test } from '@playwright/test'

test.describe('SEO Metadata Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Essential Meta Tags - WCAG 2.1 & Google SEO Guidelines', () => {
    test('should have valid html lang attribute', async ({ page }) => {
      const htmlLang = page.locator('html')
      await expect(htmlLang).toHaveAttribute('lang', 'pt-BR')
    })

    test('should have proper document title', async ({ page }) => {
      const title = await page.title()
      expect(title).toBeTruthy()
      expect(title.length).toBeGreaterThan(10)
      expect(title.length).toBeLessThanOrEqual(60)
      expect(title).toContain('EMR International')
    })

    test('should have meta description', async ({ page }) => {
      const description = page.locator('meta[name="description"]')
      await expect(description).toHaveAttribute('content')
      const content = await description.getAttribute('content')
      expect(content!.length).toBeGreaterThan(50)
      expect(content!.length).toBeLessThanOrEqual(160)
    })

    test('should have viewport meta tag', async ({ page }) => {
      const viewport = page.locator('meta[name="viewport"]')
      await expect(viewport).toHaveAttribute('content')
      const content = await viewport.getAttribute('content')
      expect(content).toContain('width=device-width')
      expect(content).toContain('initial-scale=1')
    })

    test('should have charset declaration', async ({ page }) => {
      const charset = page.locator('meta[charset]')
      const charsetValue = await charset.getAttribute('charset')
      expect(charsetValue?.toLowerCase()).toBe('utf-8')
    })
  })

  test.describe('Open Graph Tags - Social Media SEO', () => {
    test('should have og:title', async ({ page }) => {
      const ogTitle = page.locator('meta[property="og:title"]')
      await expect(ogTitle).toHaveAttribute('content')
      const content = await ogTitle.getAttribute('content')
      expect(content!.length).toBeGreaterThan(10)
    })

    test('should have og:description', async ({ page }) => {
      const ogDescription = page.locator('meta[property="og:description"]')
      await expect(ogDescription).toHaveAttribute('content')
      const content = await ogDescription.getAttribute('content')
      expect(content!.length).toBeGreaterThan(50)
    })

    test('should have og:image', async ({ page }) => {
      const ogImage = page.locator('meta[property="og:image"]')
      await expect(ogImage).toHaveAttribute('content')
      const content = await ogImage.getAttribute('content')
      expect(content).toMatch(/\.(jpg|jpeg|png|webp|avif)(\?[^?]*)?$/i)
    })

    test('og:image must be an absolute URL (crawlers do not resolve relative paths)', async ({
      page,
    }) => {
      const content = await page
        .locator('meta[property="og:image"]')
        .getAttribute('content')
      expect(content).toMatch(/^https?:\/\//)
    })

    test('og:image shares the same origin as og:url', async ({ page }) => {
      const image = await page
        .locator('meta[property="og:image"]')
        .getAttribute('content')
      const url = await page
        .locator('meta[property="og:url"]')
        .getAttribute('content')
      expect(new URL(image!).origin).toBe(new URL(url!).origin)
    })

    test('og:image resolves to a real image on the deployed site', async ({
      page,
      request,
    }) => {
      const image = await page
        .locator('meta[property="og:image"]')
        .getAttribute('content')
      // Fetch by path against the site under test, so the assertion is
      // hermetic (no dependency on the hardcoded production origin).
      const response = await request.get(new URL(image!).pathname)
      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toMatch(/^image\//)
    })

    test('og:image declares dimensions and descriptive alt text', async ({
      page,
    }) => {
      await expect(
        page.locator('meta[property="og:image:width"]')
      ).toHaveAttribute('content', '1200')
      await expect(
        page.locator('meta[property="og:image:height"]')
      ).toHaveAttribute('content', '630')

      await expect(
        page.locator('meta[property="og:image:alt"]')
      ).toHaveAttribute('content', /.{20,}/)
    })

    test('should have og:url', async ({ page }) => {
      const ogUrl = page.locator('meta[property="og:url"]')
      await expect(ogUrl).toHaveAttribute('content')
      const content = await ogUrl.getAttribute('content')
      expect(content).toMatch(/^https?:\/\//)
    })

    test('should have og:type', async ({ page }) => {
      const ogType = page.locator('meta[property="og:type"]')
      await expect(ogType).toHaveAttribute('content')
      const content = await ogType.getAttribute('content')
      expect(['website', 'article', 'business.business']).toContain(content)
    })

    test('should have og:locale', async ({ page }) => {
      const ogLocale = page.locator('meta[property="og:locale"]')
      await expect(ogLocale).toHaveAttribute('content', 'pt_BR')
    })
  })

  test.describe('Twitter Card Tags', () => {
    test('should have twitter:card', async ({ page }) => {
      const twitterCard = page.locator('meta[name="twitter:card"]')
      await expect(twitterCard).toHaveAttribute('content')
      const content = await twitterCard.getAttribute('content')
      expect(['summary', 'summary_large_image']).toContain(content)
    })

    test('should have twitter:title', async ({ page }) => {
      const twitterTitle = page.locator('meta[name="twitter:title"]')
      await expect(twitterTitle).toHaveAttribute('content')
    })

    test('should have twitter:description', async ({ page }) => {
      const twitterDesc = page.locator('meta[name="twitter:description"]')
      await expect(twitterDesc).toHaveAttribute('content')
    })

    test('should have twitter:image', async ({ page }) => {
      const twitterImage = page.locator('meta[name="twitter:image"]')
      await expect(twitterImage).toHaveAttribute('content')
    })

    test('twitter:image matches og:image and has alt text', async ({
      page,
    }) => {
      const ogImage = await page
        .locator('meta[property="og:image"]')
        .getAttribute('content')
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
        'content',
        ogImage!
      )
      await expect(
        page.locator('meta[name="twitter:image:alt"]')
      ).toHaveAttribute('content', /.{20,}/)
    })
  })

  test.describe('Canonical URL', () => {
    test('should have canonical link', async ({ page }) => {
      const canonical = page.locator('link[rel="canonical"]')
      await expect(canonical).toHaveAttribute('href')
      const href = await canonical.getAttribute('href')
      expect(href).toMatch(/^https?:\/\//)
    })

    test('canonical should not have query parameters', async ({ page }) => {
      const canonical = page.locator('link[rel="canonical"]')
      await expect(canonical).toHaveAttribute('href')
      const href = await canonical.getAttribute('href')
      expect(href).not.toContain('?')
    })
  })

  test.describe('Robots Meta Tag', () => {
    test('should have robots meta tag', async ({ page }) => {
      const robots = page.locator('meta[name="robots"]')
      await expect(robots).toHaveAttribute('content')
    })

    test('should allow indexing and following', async ({ page }) => {
      const robots = page.locator('meta[name="robots"]')
      await expect(robots).toHaveAttribute('content')
      const content = await robots.getAttribute('content')

      const tokens = content!
        .split(',')
        .map(token => token.trim().toLowerCase())

      expect(tokens).toContain('index')
      expect(tokens).toContain('follow')
      expect(tokens).not.toContain('noindex')
      expect(tokens).not.toContain('nofollow')
    })
  })

  test.describe('Keywords and Content Relevance', () => {
    test('should contain relevant keywords in title', async ({ page }) => {
      const title = await page.title()
      const keywords = [
        'APH',
        'Tático',
        'Emergência',
        'EMR',
        'International',
        'Curso',
        'Operador',
        'Áreas Remotas',
      ]
      const hasKeyword = keywords.some(keyword =>
        title.toLowerCase().includes(keyword.toLowerCase())
      )
      expect(hasKeyword).toBeTruthy()
    })

    test('should contain relevant keywords in description', async ({
      page,
    }) => {
      const descriptionLocator = page.locator('meta[name="description"]')
      await expect(descriptionLocator).toHaveAttribute('content')
      const description = await descriptionLocator.getAttribute('content')

      const keywords = [
        'aph tático',
        'tático',
        'emergência',
        'formação',
        'operador',
        'áreas remotas',
        'medicina tática',
        'tccc',
        'tecc',
        'primeiro respondente',
        'wilderness',
        'naemt',
        'certificação',
      ]
      const hasKeyword = keywords.some(keyword =>
        description!.toLowerCase().includes(keyword.toLowerCase())
      )
      expect(hasKeyword).toBeTruthy()
    })

    test('should not use keyword stuffing in meta description', async ({
      page,
    }) => {
      const descriptionLocator = page.locator('meta[name="description"]')
      await expect(descriptionLocator).toHaveAttribute('content')
      const description = await descriptionLocator.getAttribute('content')

      expect(description!.trim().length).toBeGreaterThan(0)
      const words = description!
        .toLowerCase()
        .split(/\s+/)
        .filter(w => w.length > 0)
      expect(words.length).toBeGreaterThan(0)
      const wordCount = words.reduce(
        (acc, word) => {
          acc[word] = (acc[word] || 0) + 1
          return acc
        },
        {} as Record<string, number>
      )
      const maxRepetitions = Math.max(...Object.values(wordCount))
      expect(maxRepetitions).toBeLessThanOrEqual(3)
    })
  })
})
