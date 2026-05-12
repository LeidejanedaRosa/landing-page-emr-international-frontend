import { expect, test } from '@playwright/test'

// LCP, FCP, TTFB thresholds follow Google's Core Web Vitals "Good" ranges.
// These tests run only under playwright.perf.config.ts (production build).

test.describe('Core Web Vitals', () => {
  test('LCP should be under 2500ms', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')

    const lcp = await page.evaluate(
      () =>
        new Promise<number>(resolve => {
          new PerformanceObserver(list => {
            const entries = list.getEntries()
            resolve(entries[entries.length - 1].startTime)
          }).observe({ type: 'largest-contentful-paint', buffered: true })
          setTimeout(() => resolve(0), 3000)
        })
    )

    expect(
      lcp,
      'LCP deve ser maior que 0 (elemento encontrado)'
    ).toBeGreaterThan(0)
    expect(lcp, 'LCP deve ser ≤ 2500ms (Good)').toBeLessThan(2500)
  })

  test('Navigation Timing should meet thresholds', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')

    const timing = await page.evaluate(() => {
      const [nav] = performance.getEntriesByType(
        'navigation'
      ) as PerformanceNavigationTiming[]
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0]

      return {
        ttfb: nav.responseStart - nav.requestStart,
        fcp: fcpEntry?.startTime ?? 0,
        domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
        load: nav.loadEventEnd - nav.startTime,
      }
    })

    expect(
      timing.ttfb,
      `TTFB foi ${timing.ttfb.toFixed(0)}ms — esperado < 800ms`
    ).toBeLessThan(800)

    expect(
      timing.fcp,
      `FCP foi ${timing.fcp.toFixed(0)}ms — esperado < 1800ms`
    ).toBeLessThan(1800)

    expect(
      timing.domContentLoaded,
      `DOMContentLoaded foi ${timing.domContentLoaded.toFixed(0)}ms — esperado < 2000ms`
    ).toBeLessThan(2000)

    expect(
      timing.load,
      `Load event foi ${timing.load.toFixed(0)}ms — esperado < 5000ms`
    ).toBeLessThan(5000)
  })
})
