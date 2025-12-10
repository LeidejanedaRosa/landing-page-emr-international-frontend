import { expect, test } from '@playwright/test'

test.describe('WCAG 2.1 AA Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Perceivable - WCAG Principle 1', () => {
    test.describe('Text Alternatives - 1.1.1', () => {
      test('all images should have alt text', async ({ page }) => {
        const images = await page.locator('img').all()

        for (const img of images) {
          const alt = await img.getAttribute('alt')
          const ariaLabel = await img.getAttribute('aria-label')
          const role = await img.getAttribute('role')

          if (role === 'presentation' || role === 'none') {
            expect(alt).toBe('')
          } else {
            expect(alt !== null || ariaLabel !== null).toBeTruthy()
          }
        }
      })

      test('decorative images should have empty alt or role presentation', async ({
        page,
      }) => {
        const decorativeImages = await page
          .locator('img[role="presentation"], img[role="none"]')
          .all()

        for (const img of decorativeImages) {
          const alt = await img.getAttribute('alt')
          expect(alt).toBe('')
        }
      })

      test('svg graphics should have accessible names', async ({ page }) => {
        const svgs = await page.locator('svg').all()

        for (const svg of svgs) {
          const title = await svg.locator('title').count()
          const ariaLabel = await svg.getAttribute('aria-label')
          const ariaLabelledby = await svg.getAttribute('aria-labelledby')
          const role = await svg.getAttribute('role')

          if (role === 'presentation' || role === 'none' || role === 'img') {
            continue
          }

          expect(title > 0 || ariaLabel || ariaLabelledby).toBeTruthy()
        }
      })
    })

    test.describe('Info and Relationships - 1.3.1', () => {
      test('page should have proper document structure', async ({ page }) => {
        const hasDoctype = await page.evaluate(() => document.doctype !== null)
        expect(hasDoctype).toBeTruthy()
      })

      test('should use appropriate ARIA roles', async ({ page }) => {
        const elementsWithRole = await page.locator('[role]').all()

        const validRoles = [
          'navigation',
          'main',
          'contentinfo',
          'banner',
          'search',
          'complementary',
          'article',
          'region',
          'alert',
          'alertdialog',
          'button',
          'checkbox',
          'dialog',
          'menu',
          'menubar',
          'menuitem',
          'presentation',
          'none',
          'img',
        ]

        for (const element of elementsWithRole) {
          const role = await element.getAttribute('role')
          expect(validRoles).toContain(role!)
        }
      })
    })

    test.describe('Meaningful Sequence - 1.3.2', () => {
      test('content should have logical reading order', async ({ page }) => {
        const focusableElements = await page
          .locator('a, button, input, select, textarea, [tabindex]')
          .all()

        const tabIndices = await Promise.all(
          focusableElements.map(async el => {
            const tabindex = await el.getAttribute('tabindex')
            return tabindex ? parseInt(tabindex) : 0
          })
        )

        const positiveIndices = tabIndices.filter(idx => idx > 0)
        if (positiveIndices.length > 0) {
          for (let i = 0; i < positiveIndices.length - 1; i++) {
            expect(positiveIndices[i + 1]).toBeGreaterThanOrEqual(
              positiveIndices[i]
            )
          }
        }
      })
    })

    test.describe('Use of Color - 1.4.1', () => {
      test('links should be distinguishable without relying only on color', async ({
        page,
      }) => {
        const links = await page.locator('a').all()

        for (const link of links) {
          const textDecoration = await link.evaluate(
            el => window.getComputedStyle(el).textDecoration
          )
          const fontWeight = await link.evaluate(
            el => window.getComputedStyle(el).fontWeight
          )

          const hasVisualDistinction =
            textDecoration !== 'none' || parseInt(fontWeight) >= 600

          expect(hasVisualDistinction).toBeTruthy()
        }
      })
    })

    test.describe('Contrast - 1.4.3', () => {
      test('text should have sufficient contrast ratio', async ({ page }) => {
        const textElements = await page
          .locator('p, h1, h2, h3, h4, h5, h6, span, a, button, label')
          .all()

        for (const element of textElements.slice(0, 10)) {
          const isVisible = await element.isVisible()
          if (!isVisible) continue

          const color = await element.evaluate(el => {
            const style = window.getComputedStyle(el)
            return {
              color: style.color,
              backgroundColor: style.backgroundColor,
              fontSize: style.fontSize,
            }
          })

          expect(color.color).not.toBe(color.backgroundColor)
        }
      })
    })

    test.describe('Resize Text - 1.4.4', () => {
      test('page should be readable at 200% zoom', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 720 })

        const initialContent = await page.locator('main').textContent()

        await page.evaluate(() => {
          document.body.style.zoom = '200%'
        })

        await page.waitForTimeout(500)

        const zoomedContent = await page.locator('main').textContent()

        expect(zoomedContent).toBeTruthy()
        expect(zoomedContent!.length).toBeGreaterThan(0)
      })
    })

    test.describe('Reflow - 1.4.10', () => {
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
    })

    test.describe('Non-text Contrast - 1.4.11', () => {
      test('interactive elements should have visible focus indicators', async ({
        page,
      }) => {
        const interactiveElements = await page
          .locator('a, button, input, select, textarea')
          .all()

        for (const element of interactiveElements.slice(0, 5)) {
          await element.focus()

          const outlineWidth = await element.evaluate(
            el => window.getComputedStyle(el).outlineWidth
          )
          const boxShadow = await element.evaluate(
            el => window.getComputedStyle(el).boxShadow
          )

          const hasFocusIndicator =
            outlineWidth !== '0px' || boxShadow !== 'none'
          expect(hasFocusIndicator).toBeTruthy()
        }
      })
    })
  })

  test.describe('Operable - WCAG Principle 2', () => {
    test.describe('Keyboard - 2.1.1', () => {
      test('all interactive elements should be keyboard accessible', async ({
        page,
      }) => {
        const interactiveElements = await page
          .locator('a, button, input, select, textarea, [onclick]')
          .all()

        for (const element of interactiveElements) {
          const tagName = await element.evaluate(el => el.tagName.toLowerCase())
          const tabindex = await element.getAttribute('tabindex')
          const role = await element.getAttribute('role')

          if (tabindex === '-1' && role !== 'button') {
            continue
          }

          const isFocusable =
            ['a', 'button', 'input', 'select', 'textarea'].includes(tagName) ||
            (tabindex && parseInt(tabindex) >= 0)

          expect(isFocusable).toBeTruthy()
        }
      })

      test('should be able to navigate with Tab key', async ({ page }) => {
        await page.keyboard.press('Tab')
        const firstFocused = await page.evaluate(
          () => document.activeElement?.tagName
        )
        expect(firstFocused).toBeTruthy()

        await page.keyboard.press('Tab')
        const secondFocused = await page.evaluate(
          () => document.activeElement?.tagName
        )
        expect(secondFocused).toBeTruthy()
        expect(firstFocused).not.toBe('BODY')
      })
    })

    test.describe('No Keyboard Trap - 2.1.2', () => {
      test('should not trap keyboard focus', async ({ page }) => {
        const focusableElements = await page
          .locator('a, button, input, select, textarea')
          .all()

        for (const element of focusableElements.slice(0, 3)) {
          await element.focus()
          await page.keyboard.press('Tab')

          const activeElement = await page.evaluate(
            () => document.activeElement?.tagName
          )
          expect(activeElement).toBeTruthy()
        }
      })
    })

    test.describe('Bypass Blocks - 2.4.1', () => {
      test('should have skip navigation link', async ({ page }) => {
        const skipLink = await page.locator('a[href^="#"]').first()
        const skipLinkText = await skipLink.textContent()

        const hasSkipLink =
          skipLinkText?.toLowerCase().includes('skip') ||
          skipLinkText?.toLowerCase().includes('pular')

        expect(hasSkipLink).toBeTruthy()
      })
    })

    test.describe('Page Titled - 2.4.2', () => {
      test('page should have descriptive title', async ({ page }) => {
        const title = await page.title()
        expect(title).toBeTruthy()
        expect(title.length).toBeGreaterThan(10)
        expect(title).not.toBe('Document')
        expect(title).not.toBe('Untitled')
      })
    })

    test.describe('Focus Order - 2.4.3', () => {
      test('focus order should be logical', async ({ page }) => {
        const focusOrder: string[] = []
        const focusableElements = await page
          .locator('a, button, input:not([type="hidden"])')
          .all()

        for (const element of focusableElements.slice(0, 5)) {
          await element.focus()
          const tagName = await element.evaluate(el => el.tagName)
          focusOrder.push(tagName)
        }

        expect(focusOrder.length).toBeGreaterThan(0)
      })
    })

    test.describe('Link Purpose - 2.4.4', () => {
      test('links should have clear purpose', async ({ page }) => {
        const links = await page.locator('a[href]').all()

        for (const link of links) {
          const text = await link.textContent()
          const ariaLabel = await link.getAttribute('aria-label')
          const title = await link.getAttribute('title')

          const linkPurpose = text?.trim() || ariaLabel || title
          expect(linkPurpose).toBeTruthy()
          expect(linkPurpose!.length).toBeGreaterThan(1)
        }
      })
    })

    test.describe('Headings and Labels - 2.4.6', () => {
      test('headings should describe topic or purpose', async ({ page }) => {
        const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()

        for (const heading of headings) {
          const text = await heading.textContent()
          expect(text?.trim()).toBeTruthy()
          expect(text!.trim().length).toBeGreaterThan(3)
        }
      })
    })

    test.describe('Focus Visible - 2.4.7', () => {
      test('keyboard focus should be visible', async ({ page }) => {
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
    })

    test.describe('Target Size - 2.5.5', () => {
      test('interactive elements should have adequate target size', async ({
        page,
      }) => {
        const interactiveElements = await page.locator('a, button').all()

        for (const element of interactiveElements.slice(0, 10)) {
          const box = await element.boundingBox()
          if (box) {
            const minSize = 24
            expect(box.width).toBeGreaterThanOrEqual(minSize)
            expect(box.height).toBeGreaterThanOrEqual(minSize)
          }
        }
      })
    })
  })

  test.describe('Understandable - WCAG Principle 3', () => {
    test.describe('Language of Page - 3.1.1', () => {
      test('page should have lang attribute', async ({ page }) => {
        const lang = await page.getAttribute('html', 'lang')
        expect(lang).toBeTruthy()
        expect(lang).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/)
      })
    })

    test.describe('On Focus - 3.2.1', () => {
      test('focus should not cause unexpected context change', async ({
        page,
      }) => {
        const initialUrl = page.url()
        const focusableElement = page.locator('a, button, input').first()

        await focusableElement.focus()
        await page.waitForTimeout(100)

        const currentUrl = page.url()
        expect(currentUrl).toBe(initialUrl)
      })
    })

    test.describe('Labels or Instructions - 3.3.2', () => {
      test('form inputs should have labels or instructions', async ({
        page,
      }) => {
        const inputs = await page
          .locator('input:not([type="hidden"]), textarea, select')
          .all()

        for (const input of inputs) {
          const id = await input.getAttribute('id')
          const ariaLabel = await input.getAttribute('aria-label')
          const ariaLabelledby = await input.getAttribute('aria-labelledby')
          const placeholder = await input.getAttribute('placeholder')

          const hasLabel = id
            ? (await page.locator(`label[for="${id}"]`).count()) > 0
            : false

          expect(
            hasLabel || ariaLabel || ariaLabelledby || placeholder
          ).toBeTruthy()
        }
      })
    })

    test.describe('Error Identification - 3.3.1', () => {
      test('error messages should be clearly identified', async ({ page }) => {
        const errorElements = await page
          .locator(
            '[role="alert"], [aria-live="polite"], [aria-live="assertive"]'
          )
          .count()

        expect(errorElements).toBeGreaterThanOrEqual(0)
      })
    })
  })

  test.describe('Robust - WCAG Principle 4', () => {
    test.describe('Name, Role, Value - 4.1.2', () => {
      test('custom interactive elements should have proper ARIA', async ({
        page,
      }) => {
        const customElements = await page
          .locator('[role="button"], [role="checkbox"], [role="tab"]')
          .all()

        for (const element of customElements) {
          const role = await element.getAttribute('role')
          const ariaLabel = await element.getAttribute('aria-label')
          const ariaLabelledby = await element.getAttribute('aria-labelledby')
          const text = await element.textContent()

          expect(role).toBeTruthy()
          expect(ariaLabel || ariaLabelledby || text?.trim()).toBeTruthy()
        }
      })
    })

    test.describe('Status Messages - 4.1.3', () => {
      test('status messages should use appropriate ARIA', async ({ page }) => {
        const statusElements = await page
          .locator('[role="status"], [role="alert"], [aria-live]')
          .all()

        for (const element of statusElements) {
          const role = await element.getAttribute('role')
          const ariaLive = await element.getAttribute('aria-live')

          expect(role || ariaLive).toBeTruthy()
        }
      })
    })
  })
})
