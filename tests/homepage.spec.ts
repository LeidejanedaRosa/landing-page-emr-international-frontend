import { expect, test } from '@playwright/test'

test.describe('EMR Internacional - Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load homepage with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/EMR Internacional/)

    const logo = page.getByAltText(/EMR Internacional Logo/i)
    await expect(logo).toBeVisible()
  })

  test('should have accessible navigation', async ({ page }) => {
    const nav = page.getByRole('navigation')
    await expect(nav).toBeVisible()

    await expect(page.getByRole('link', { name: /sobre/i })).toBeVisible()
    await expect(
      page.getByRole('link', { name: /certificações/i })
    ).toBeVisible()
    await expect(page.getByRole('link', { name: /cursos/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /contato/i })).toBeVisible()
  })

  test('should navigate to sections via menu', async ({ page }) => {
    await page.getByRole('link', { name: /sobre/i }).click()

    await expect(page.locator('#sobre')).toBeInViewport()

    await page.getByRole('link', { name: /cursos/i }).click()
    await expect(page.locator('#cursos')).toBeInViewport()
  })

  test('should have working contact form', async ({ page }) => {
    await page.getByRole('link', { name: /contato/i }).click()
    await expect(page.locator('#contato')).toBeInViewport()

    await page.getByLabel(/nome/i).fill('João Silva')
    await page.getByLabel(/email/i).fill('joao@example.com')
    await page.getByLabel(/mensagem/i).fill('Teste de mensagem do Playwright')

    await page.getByRole('button', { name: /enviar/i }).click()

    const submitButton = page.getByRole('button', { name: /enviar/i })

    await expect(submitButton).toBeDisabled()
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
    await page.goto('/')

    await page.keyboard.press('Tab')

    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('should have skip link for screen readers', async ({ page }) => {
    await page.goto('/')

    await page.keyboard.press('Tab')

    const skipLink = page.getByRole('link', { name: /pular para o conteúdo/i })

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

    const mobileMenu = page
      .getByRole('navigation')
      .locator('[role="menu"], [id*="menu"]')
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
    const startTime = Date.now()

    await page.goto('/')

    await page.waitForLoadState('networkidle')

    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(5000)
  })

  test('should have no console errors', async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const criticalErrors = consoleErrors.filter(
      error =>
        !error.includes('favicon') &&
        !error.includes('404') &&
        !error.toLowerCase().includes('warning')
    )

    expect(criticalErrors).toHaveLength(0)
  })
})
