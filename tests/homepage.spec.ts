import { expect, test } from '@playwright/test'

test.describe('EMR International - Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load homepage with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/EMR International/)

    const logo = page.getByRole('banner').getByAltText(/EMR International/i)
    await expect(logo).toBeVisible()
  })

  test('should have accessible navigation', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Navegação principal' })
    await expect(nav).toBeVisible()

    const isMobile = (page.viewportSize()?.width ?? 1280) < 768
    if (isMobile) {
      await page.getByRole('button', { name: /menu/i }).click()
      await page.getByTestId('mobile-menu').waitFor({ state: 'visible' })
    }

    for (const name of [
      /sobre/i,
      /certificações/i,
      /treinamentos/i,
      /contato/i,
    ]) {
      await expect(nav.getByRole('link', { name })).toBeVisible()
    }
  })

  test('should navigate to sections via menu', async ({ page }) => {
    await page.locator('#contato').waitFor({ state: 'attached' })
    const isMobile = (page.viewportSize()?.width ?? 1280) < 768
    const nav = page.getByRole('navigation', { name: 'Navegação principal' })

    if (isMobile) {
      await page.getByRole('button', { name: /menu/i }).click()
      await page.getByTestId('mobile-menu').waitFor({ state: 'visible' })
    }

    await nav.getByRole('link', { name: /sobre/i }).click()
    await page.waitForURL('**/#sobre')
    await expect(page.locator('#sobre')).toBeInViewport({ timeout: 8000 })

    if (isMobile) {
      await page.getByRole('button', { name: /menu/i }).click()
      await page.getByTestId('mobile-menu').waitFor({ state: 'visible' })
    }

    await nav.getByRole('link', { name: /treinamentos/i }).click()
    await page.waitForURL('**/#treinamentos')
    await expect(page.locator('#treinamentos')).toBeInViewport({
      timeout: 8000,
    })
  })

  test('should navigate to contact section via menu', async ({ page }) => {
    await page.locator('#contato').waitFor({ state: 'attached' })
    const isMobile = (page.viewportSize()?.width ?? 1280) < 768
    const nav = page.getByRole('navigation', { name: 'Navegação principal' })

    if (isMobile) {
      await page.getByRole('button', { name: /menu/i }).click()
      await page.getByTestId('mobile-menu').waitFor({ state: 'visible' })
    }

    await nav.getByRole('link', { name: /contato/i }).click()
    await page.waitForURL('**/#contato')
    // Mobile menu closing causes a layout shift that may move the footer; re-scroll if needed
    await page.locator('#contato').scrollIntoViewIfNeeded()
    await expect(page.locator('#contato')).toBeInViewport({ timeout: 8000 })
  })
})

test.describe('Accessibility Tests', () => {
  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/')

    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()

    const h2s = page.getByRole('heading', { level: 2 })
    await expect(h2s.first()).toBeVisible()
  })

  test('should support keyboard navigation', async ({ page }) => {
    const isMobile = (page.viewportSize()?.width ?? 1280) < 768
    test.skip(
      isMobile,
      'Tab keyboard navigation is not applicable on mobile browsers'
    )

    await page.goto('/')

    await page.keyboard.press('Tab')

    // The skip link is sr-only and becomes visible only when focused (focus:not-sr-only)
    // Using toBeVisible as a proxy for focus since Chromium dispatches Tab focus asynchronously
    await expect(
      page.getByRole('link', { name: /pular para conteúdo/i })
    ).toBeVisible({ timeout: 3000 })
  })

  test('should have skip link for screen readers', async ({ page }) => {
    await page.goto('/')

    await page.keyboard.press('Tab')

    const skipLink = page.getByRole('link', { name: /pular para conteúdo/i })

    await expect(skipLink).toBeVisible()
  })
})

test.describe('Mobile Responsiveness', () => {
  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const mobileMenuButton = page.getByRole('button', { name: /menu/i })
    await expect(mobileMenuButton).toBeVisible()

    await mobileMenuButton.click()

    const mobileMenu = page.getByTestId('mobile-menu')
    await expect(mobileMenu).toBeVisible()
  })

  test('should have readable text on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const heroHeading = page.getByRole('heading', { level: 1 })
    await expect(heroHeading).toBeVisible()

    const bodyElement = page.locator('body')
    const boundingBox = await bodyElement.boundingBox()

    expect(boundingBox).not.toBeNull()
    expect(boundingBox!.width).toBeLessThanOrEqual(375)
  })
})

test.describe('Performance Tests', () => {
  test('should load within acceptable time', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')

    const loadTime = await page.evaluate(() => {
      const [nav] = performance.getEntriesByType(
        'navigation'
      ) as PerformanceNavigationTiming[]
      return nav.loadEventEnd - nav.startTime
    })

    expect(loadTime).toBeLessThan(10000)
  })

  test('should have no console errors', async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('load')

    const criticalErrors = consoleErrors.filter(
      error =>
        !error.includes('favicon') &&
        !error.includes('404') &&
        !error.toLowerCase().includes('warning')
    )

    expect(criticalErrors).toHaveLength(0)
  })
})
