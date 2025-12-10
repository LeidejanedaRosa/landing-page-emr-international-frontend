import { expect, test } from '@playwright/test'

test.describe('SEO Metadata Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Essential Meta Tags - WCAG 2.1 & Google SEO Guidelines', () => {
    test('should have valid html lang attribute', async ({ page }) => {
      const htmlLang = await page.getAttribute('html', 'lang')
      expect(htmlLang).toBe('pt-BR')
    })

    test('should have proper document title', async ({ page }) => {
      const title = await page.title()
      expect(title).toBeTruthy()
      expect(title.length).toBeGreaterThan(10)
      expect(title.length).toBeLessThanOrEqual(60)
      expect(title).toContain('EMR Internacional')
    })

    test('should have meta description', async ({ page }) => {
      const description = await page.getAttribute(
        'meta[name="description"]',
        'content'
      )
      expect(description).toBeTruthy()
      expect(description!.length).toBeGreaterThan(50)
      expect(description!.length).toBeLessThanOrEqual(160)
    })

    test('should have viewport meta tag', async ({ page }) => {
      const viewport = await page.getAttribute(
        'meta[name="viewport"]',
        'content'
      )
      expect(viewport).toContain('width=device-width')
      expect(viewport).toContain('initial-scale=1')
    })

    test('should have charset declaration', async ({ page }) => {
      const charset = await page.getAttribute('meta[charset]', 'charset')
      expect(charset?.toLowerCase()).toBe('utf-8')
    })
  })

  test.describe('Open Graph Tags - Social Media SEO', () => {
    test('should have og:title', async ({ page }) => {
      const ogTitle = await page.getAttribute(
        'meta[property="og:title"]',
        'content'
      )
      expect(ogTitle).toBeTruthy()
      expect(ogTitle!.length).toBeGreaterThan(10)
    })

    test('should have og:description', async ({ page }) => {
      const ogDescription = await page.getAttribute(
        'meta[property="og:description"]',
        'content'
      )
      expect(ogDescription).toBeTruthy()
      expect(ogDescription!.length).toBeGreaterThan(50)
    })

    test('should have og:image', async ({ page }) => {
      const ogImage = await page.getAttribute(
        'meta[property="og:image"]',
        'content'
      )
      expect(ogImage).toBeTruthy()
      expect(ogImage).toMatch(/\.(jpg|jpeg|png|webp)$/i)
    })

    test('should have og:url', async ({ page }) => {
      const ogUrl = await page.getAttribute(
        'meta[property="og:url"]',
        'content'
      )
      expect(ogUrl).toBeTruthy()
      expect(ogUrl).toMatch(/^https?:\/\//)
    })

    test('should have og:type', async ({ page }) => {
      const ogType = await page.getAttribute(
        'meta[property="og:type"]',
        'content'
      )
      expect(ogType).toBeTruthy()
      expect(['website', 'article', 'business.business']).toContain(ogType)
    })

    test('should have og:locale', async ({ page }) => {
      const ogLocale = await page.getAttribute(
        'meta[property="og:locale"]',
        'content'
      )
      expect(ogLocale).toBe('pt_BR')
    })
  })

  test.describe('Twitter Card Tags', () => {
    test('should have twitter:card', async ({ page }) => {
      const twitterCard = await page.getAttribute(
        'meta[name="twitter:card"]',
        'content'
      )
      expect(twitterCard).toBeTruthy()
      expect(['summary', 'summary_large_image']).toContain(twitterCard)
    })

    test('should have twitter:title', async ({ page }) => {
      const twitterTitle = await page.getAttribute(
        'meta[name="twitter:title"]',
        'content'
      )
      expect(twitterTitle).toBeTruthy()
    })

    test('should have twitter:description', async ({ page }) => {
      const twitterDesc = await page.getAttribute(
        'meta[name="twitter:description"]',
        'content'
      )
      expect(twitterDesc).toBeTruthy()
    })

    test('should have twitter:image', async ({ page }) => {
      const twitterImage = await page.getAttribute(
        'meta[name="twitter:image"]',
        'content'
      )
      expect(twitterImage).toBeTruthy()
    })
  })

  test.describe('Canonical URL', () => {
    test('should have canonical link', async ({ page }) => {
      const canonical = await page.getAttribute('link[rel="canonical"]', 'href')
      expect(canonical).toBeTruthy()
      expect(canonical).toMatch(/^https?:\/\//)
    })

    test('canonical should not have query parameters', async ({ page }) => {
      const canonical = await page.getAttribute('link[rel="canonical"]', 'href')
      expect(canonical).not.toContain('?')
    })
  })

  test.describe('Robots Meta Tag', () => {
    test('should have robots meta tag', async ({ page }) => {
      const robots = await page.getAttribute('meta[name="robots"]', 'content')
      expect(robots).toBeTruthy()
    })

    test('should allow indexing and following', async ({ page }) => {
      const robots = await page.getAttribute('meta[name="robots"]', 'content')
      expect(robots).toContain('index')
      expect(robots).toContain('follow')
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
        'Internacional',
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
      const description = await page.getAttribute(
        'meta[name="description"]',
        'content'
      )
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
      const description = await page.getAttribute(
        'meta[name="description"]',
        'content'
      )
      const words = description!.toLowerCase().split(/\s+/)
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
