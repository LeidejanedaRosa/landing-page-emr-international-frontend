import { expect, test } from '@playwright/test'

const STACKED_LAYOUT_MAX_WIDTH = 767
const PHOTO_ASPECT_RATIO = 3 / 2

const CONSTRAINED_VIEWPORTS = [
  { name: 'smallest supported phone', width: 320, height: 568 },
  { name: 'short embed such as a portfolio iframe', width: 375, height: 440 },
  { name: 'tablet split column', width: 768, height: 1024 },
  { name: 'short desktop window', width: 1024, height: 500 },
]

for (const { name, width, height } of CONSTRAINED_VIEWPORTS) {
  test.describe(`Hero on ${name} (${width}x${height})`, () => {
    test.use({ viewport: { width, height } })

    test.beforeEach(async ({ page }) => {
      await page.goto('/')
    })

    test('should show the whole CTA label inside the button', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-main-title"]')
      const cta = hero.getByRole('button', {
        name: /conheça nossos treinamentos/i,
      })
      await expect(cta).toBeVisible()

      const overflow = await cta.evaluate(button => {
        const label = button.querySelector('span')!.getBoundingClientRect()
        const box = button.getBoundingClientRect()
        return {
          horizontal: button.scrollWidth - button.clientWidth,
          labelInsideButton: label.left >= box.left && label.right <= box.right,
        }
      })

      expect(overflow.horizontal).toBeLessThanOrEqual(0)
      expect(overflow.labelInsideButton).toBe(true)
    })

    test('should not clip any hero content', async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="hero-main-title"]')
      await expect(hero.getByRole('heading', { level: 1 })).toBeVisible()

      const clipped = await hero.evaluate(section => {
        const frame = section.firstElementChild!
        const bounds = frame.getBoundingClientRect()
        const content = section.querySelectorAll(
          'h1, button, [role="group"], [role="status"]'
        )
        return {
          hiddenOverflow: frame.scrollHeight - frame.clientHeight,
          outside: [...content]
            .filter(element => {
              const box = element.getBoundingClientRect()
              return (
                box.top < bounds.top - 1 ||
                box.bottom > bounds.bottom + 1 ||
                box.right > bounds.right + 1 ||
                box.left < bounds.left - 1
              )
            })
            .map(element => element.textContent?.trim().slice(0, 30)),
        }
      })

      expect(clipped.hiddenOverflow).toBeLessThanOrEqual(0)
      expect(clipped.outside).toEqual([])
    })

    test('should keep the photo tall enough to show it uncropped vertically', async ({
      page,
    }) => {
      test.skip(
        width > STACKED_LAYOUT_MAX_WIDTH,
        'photo fills a side column instead of a stacked band'
      )

      const photo = await page.getByTestId('hero-visual').boundingBox()

      expect(photo).not.toBeNull()
      expect(photo!.height).toBeGreaterThanOrEqual(
        photo!.width / PHOTO_ASPECT_RATIO - 1
      )
    })

    test('should not scroll horizontally', async ({ page }) => {
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth
      )
      expect(scrollWidth).toBeLessThanOrEqual(width)
    })
  })
}
