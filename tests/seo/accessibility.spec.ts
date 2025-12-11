import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('WCAG 2.1 AA Accessibility Tests - Axe-core', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Automated Accessibility Scanning', () => {
    test('should pass WCAG 2.1 Level AA compliance (required)', async ({
      page,
    }) => {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      expect(accessibilityScanResults.violations).toEqual([])
    })

    test.skip('should pass best practices checks (optional)', async ({
      page,
    }) => {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['best-practice'])
        .analyze()

      if (accessibilityScanResults.violations.length > 0) {
        console.warn(
          'Best practice violations:',
          accessibilityScanResults.violations.map(v => v.id)
        )
      }

      expect(accessibilityScanResults.violations.length).toBeLessThan(10)
    })
  })

  test.describe('Manual Keyboard Navigation Tests', () => {
    test('should navigate through interactive elements with Tab key', async ({
      page,
    }) => {
      const focusedElements: string[] = []

      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab')
        const focused = await page.evaluate(
          () =>
            `${document.activeElement?.tagName}:${document.activeElement?.textContent?.slice(0, 20)}`
        )
        focusedElements.push(focused)
      }

      const uniqueFocusedElements = new Set(focusedElements)
      expect(uniqueFocusedElements.size).toBeGreaterThan(1)
      expect(focusedElements[0]).not.toBe('BODY:')
    })

    test('should have visible focus indicators on interactive elements', async ({
      page,
    }) => {
      const firstFocusable = page.locator('a, button').first()
      await firstFocusable.focus()

      const hasVisibleFocus = await firstFocusable.evaluate(el => {
        const styles = window.getComputedStyle(el)
        return (
          styles.outlineWidth !== '0px' ||
          styles.boxShadow !== 'none' ||
          styles.borderWidth !== '0px'
        )
      })

      expect(hasVisibleFocus).toBeTruthy()
    })

    test('should have skip navigation link', async ({ page }) => {
      const skipLink = await page.locator('a[href^="#"]').first()
      const skipLinkText = await skipLink.textContent()

      const hasSkipLink =
        skipLinkText?.toLowerCase().includes('skip') ||
        skipLinkText?.toLowerCase().includes('pular')

      expect(hasSkipLink).toBeTruthy()
    })
  })

  test.describe('Responsive and Zoom Tests', () => {
    test('content should reflow at 320px width without horizontal scrolling', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 320, height: 568 })

      const hasHorizontalScroll = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth
        )
      })

      expect(hasHorizontalScroll).toBeFalsy()
    })

    test('page should be readable at 200% zoom', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })

      await page.evaluate(() => {
        document.body.style.zoom = '200%'
      })

      await page.waitForTimeout(500)

      const mainContent = await page.locator('main').first().textContent()
      expect(mainContent).toBeTruthy()
      expect(mainContent!.length).toBeGreaterThan(0)

      const hasHorizontalScroll = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 10
        )
      })

      expect(hasHorizontalScroll).toBeFalsy()
    })
  })

  test.describe('Page Metadata and Structure', () => {
    test('page should have descriptive title', async ({ page }) => {
      const title = await page.title()
      expect(title).toBeTruthy()
      expect(title.length).toBeGreaterThan(10)
      expect(title).not.toBe('Document')
      expect(title).not.toBe('Untitled')
    })

    test('page should have lang attribute', async ({ page }) => {
      const lang = await page.getAttribute('html', 'lang')
      expect(lang).toBeTruthy()
      expect(lang).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/)
    })
  })
})
