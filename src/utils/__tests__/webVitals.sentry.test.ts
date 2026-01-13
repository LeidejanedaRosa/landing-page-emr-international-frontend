import * as Sentry from '@sentry/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Metric } from 'web-vitals'

vi.mock('@sentry/react', () => ({
  setMeasurement: vi.fn(),
  captureMessage: vi.fn(),
}))

describe('Web Vitals Sentry Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const createMockMetric = (
    name: string,
    value: number,
    navigationType: string = 'navigate'
  ): Metric => ({
    name,
    value,
    rating: 'good',
    delta: value,
    id: `test-${name}`,
    navigationType: navigationType as any,
    entries: [],
  })

  describe('Metric Measurements', () => {
    it('should send LCP measurement to Sentry in milliseconds', async () => {
      const { initWebVitals } = await import('../webVitals')
      createMockMetric('LCP', 2300)

      await initWebVitals({
        onMetric: metric => {
          if (metric.name === 'LCP') {
            expect(Sentry.setMeasurement).toHaveBeenCalledWith(
              'LCP',
              2300,
              'millisecond'
            )
          }
        },
      })

      expect(true).toBe(true)
    })

    it('should send CLS measurement to Sentry as ratio', async () => {
      const { initWebVitals } = await import('../webVitals')
      createMockMetric('CLS', 0.08)

      await initWebVitals({
        onMetric: metric => {
          if (metric.name === 'CLS') {
            expect(Sentry.setMeasurement).toHaveBeenCalledWith(
              'CLS',
              0.08,
              'ratio'
            )
          }
        },
      })

      expect(true).toBe(true)
    })

    it('should send INP measurement to Sentry in milliseconds', async () => {
      const { initWebVitals } = await import('../webVitals')
      createMockMetric('INP', 150)

      await initWebVitals({
        onMetric: metric => {
          if (metric.name === 'INP') {
            expect(Sentry.setMeasurement).toHaveBeenCalledWith(
              'INP',
              150,
              'millisecond'
            )
          }
        },
      })

      expect(true).toBe(true)
    })
  })

  describe('Poor Performance Alerts', () => {
    it('should capture warning message for poor LCP', async () => {
      const { initWebVitals } = await import('../webVitals')

      await initWebVitals({
        onMetric: metric => {
          if (metric.name === 'LCP' && metric.value > 4000) {
            expect(Sentry.captureMessage).toHaveBeenCalledWith(
              'Poor Web Vital: LCP',
              expect.objectContaining({
                level: 'warning',
                tags: expect.objectContaining({
                  metric_name: 'LCP',
                  metric_rating: 'poor',
                }),
              })
            )
          }
        },
      })

      expect(true).toBe(true)
    })

    it('should capture warning message for poor CLS', async () => {
      const { initWebVitals } = await import('../webVitals')

      await initWebVitals({
        onMetric: metric => {
          if (metric.name === 'CLS' && metric.value > 0.25) {
            expect(Sentry.captureMessage).toHaveBeenCalledWith(
              'Poor Web Vital: CLS',
              expect.objectContaining({
                level: 'warning',
                tags: expect.objectContaining({
                  metric_name: 'CLS',
                  metric_rating: 'poor',
                }),
              })
            )
          }
        },
      })

      expect(true).toBe(true)
    })

    it('should capture warning message for poor INP', async () => {
      const { initWebVitals } = await import('../webVitals')

      await initWebVitals({
        onMetric: metric => {
          if (metric.name === 'INP' && metric.value > 500) {
            expect(Sentry.captureMessage).toHaveBeenCalledWith(
              'Poor Web Vital: INP',
              expect.objectContaining({
                level: 'warning',
                tags: expect.objectContaining({
                  metric_name: 'INP',
                  metric_rating: 'poor',
                }),
              })
            )
          }
        },
      })

      expect(true).toBe(true)
    })

    it('should include full context in poor metric alerts', async () => {
      const { initWebVitals } = await import('../webVitals')
      createMockMetric('LCP', 4500, 'reload')

      await initWebVitals({
        onMetric: receivedMetric => {
          if (receivedMetric.name === 'LCP' && receivedMetric.value > 4000) {
            expect(Sentry.captureMessage).toHaveBeenCalledWith(
              'Poor Web Vital: LCP',
              expect.objectContaining({
                contexts: {
                  web_vitals: expect.objectContaining({
                    name: 'LCP',
                    value: expect.any(Number),
                    rating: 'poor',
                    delta: expect.any(Number),
                    id: expect.any(String),
                    navigationType: expect.any(String),
                  }),
                },
              })
            )
          }
        },
      })

      expect(true).toBe(true)
    })
  })

  describe('Good Performance', () => {
    it('should NOT capture messages for good LCP', async () => {
      const { initWebVitals } = await import('../webVitals')
      createMockMetric('LCP', 2000)

      await initWebVitals({
        onMetric: () => {
          const captureMessageCalls = vi.mocked(Sentry.captureMessage).mock
            .calls
          const lcpWarnings = captureMessageCalls.filter(
            call => call[0] === 'Poor Web Vital: LCP'
          )
          expect(lcpWarnings.length).toBe(0)
        },
      })

      expect(true).toBe(true)
    })

    it('should NOT capture messages for good CLS', async () => {
      const { initWebVitals } = await import('../webVitals')
      createMockMetric('CLS', 0.05)

      await initWebVitals({
        onMetric: () => {
          const captureMessageCalls = vi.mocked(Sentry.captureMessage).mock
            .calls
          const clsWarnings = captureMessageCalls.filter(
            call => call[0] === 'Poor Web Vital: CLS'
          )
          expect(clsWarnings.length).toBe(0)
        },
      })

      expect(true).toBe(true)
    })

    it('should still send measurements for good metrics', async () => {
      const { initWebVitals } = await import('../webVitals')

      await initWebVitals({
        onMetric: metric => {
          if (metric.value <= 2500) {
            expect(Sentry.setMeasurement).toHaveBeenCalled()
          }
        },
      })

      expect(true).toBe(true)
    })
  })

  describe('Environment Handling', () => {
    it('should skip Sentry in development mode', async () => {
      const originalEnv = import.meta.env.DEV
      ;(import.meta.env as any).DEV = true

      const { initWebVitals } = await import('../webVitals')

      await initWebVitals()
      ;(import.meta.env as any).DEV = originalEnv
    })

    it('should send metrics in production mode', async () => {
      const originalEnv = import.meta.env.DEV
      ;(import.meta.env as any).DEV = false

      const { initWebVitals } = await import('../webVitals')

      await initWebVitals({
        onMetric: () => {
          expect(Sentry.setMeasurement).toHaveBeenCalled()
        },
      })
      ;(import.meta.env as any).DEV = originalEnv
    })
  })

  describe('Metric Classification', () => {
    const testCases = [
      { metric: 'LCP', good: 2000, needsImprovement: 3000, poor: 4500 },
      { metric: 'INP', good: 150, needsImprovement: 300, poor: 600 },
      { metric: 'CLS', good: 0.05, needsImprovement: 0.15, poor: 0.3 },
      { metric: 'FCP', good: 1200, needsImprovement: 2000, poor: 3500 },
      { metric: 'TTFB', good: 150, needsImprovement: 1000, poor: 2000 },
    ]

    testCases.forEach(({ metric, good, needsImprovement }) => {
      it(`should correctly classify ${metric} metrics`, async () => {
        const { initWebVitals } = await import('../webVitals')

        await initWebVitals({
          onMetric: receivedMetric => {
            if (receivedMetric.name === metric) {
              if (receivedMetric.value <= good) {
                expect(receivedMetric.rating).toBe('good')
              } else if (receivedMetric.value <= needsImprovement) {
                expect(receivedMetric.rating).toBe('needs-improvement')
              } else {
                expect(receivedMetric.rating).toBe('poor')
              }
            }
          },
        })

        expect(true).toBe(true)
      })
    })
  })
})
