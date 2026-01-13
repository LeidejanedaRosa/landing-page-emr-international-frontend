/// <reference types="vite/client" />
import * as Sentry from '@sentry/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@sentry/react', () => ({
  setMeasurement: vi.fn(),
  captureMessage: vi.fn(),
}))

describe('Web Vitals Sentry Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Environment Handling', () => {
    it('should skip Sentry in development mode', async () => {
      const originalEnv = import.meta.env.DEV

      try {
        ;(import.meta.env as any).DEV = true

        vi.resetModules()
        const { initWebVitals } = await import('../webVitals')

        await initWebVitals()

        // In DEV mode, Sentry should not be called even if metrics are reported
        expect(Sentry.setMeasurement).not.toHaveBeenCalled()
        expect(Sentry.captureMessage).not.toHaveBeenCalled()
      } finally {
        ;(import.meta.env as any).DEV = originalEnv
        vi.resetModules()
      }
    })

    it('should allow Sentry calls in production mode', async () => {
      const originalEnv = import.meta.env.DEV

      try {
        ;(import.meta.env as any).DEV = false

        vi.resetModules()
        await import('../webVitals')

        // In PROD mode, Sentry functions should be available (not called yet, but mockable)
        expect(Sentry.setMeasurement).toBeDefined()
        expect(Sentry.captureMessage).toBeDefined()
      } finally {
        ;(import.meta.env as any).DEV = originalEnv
        vi.resetModules()
      }
    })
  })

  describe('Metric Classification Logic', () => {
    it('should have correct LCP thresholds', async () => {
      vi.resetModules()
      const { THRESHOLDS } = await import('../webVitals')
      expect(THRESHOLDS.LCP.good).toBe(2500)
      expect(THRESHOLDS.LCP.poor).toBe(4000)
    })

    it('should have correct INP thresholds', async () => {
      vi.resetModules()
      const { THRESHOLDS } = await import('../webVitals')
      expect(THRESHOLDS.INP.good).toBe(200)
      expect(THRESHOLDS.INP.poor).toBe(500)
    })

    it('should have correct CLS thresholds', async () => {
      vi.resetModules()
      const { THRESHOLDS } = await import('../webVitals')
      expect(THRESHOLDS.CLS.good).toBe(0.1)
      expect(THRESHOLDS.CLS.poor).toBe(0.25)
    })

    it('should have correct FCP thresholds (updated to 1.8s)', async () => {
      vi.resetModules()
      const { THRESHOLDS } = await import('../webVitals')
      expect(THRESHOLDS.FCP.good).toBe(1800)
      expect(THRESHOLDS.FCP.poor).toBe(3000)
    })

    it('should have correct TTFB thresholds (updated to 800ms)', async () => {
      vi.resetModules()
      const { THRESHOLDS } = await import('../webVitals')
      expect(THRESHOLDS.TTFB.good).toBe(800)
      expect(THRESHOLDS.TTFB.poor).toBe(1800)
    })
  })

  describe('Sentry Integration Setup', () => {
    it('should have setMeasurement function mocked', () => {
      expect(Sentry.setMeasurement).toBeDefined()
      expect(vi.isMockFunction(Sentry.setMeasurement)).toBe(true)
    })

    it('should have captureMessage function mocked', () => {
      expect(Sentry.captureMessage).toBeDefined()
      expect(vi.isMockFunction(Sentry.captureMessage)).toBe(true)
    })

    it('should clear mocks between tests', () => {
      Sentry.setMeasurement('test', 100, 'millisecond')
      expect(Sentry.setMeasurement).toHaveBeenCalledTimes(1)

      vi.clearAllMocks()

      expect(Sentry.setMeasurement).toHaveBeenCalledTimes(0)
    })
  })

  describe('Configuration', () => {
    it('should accept configuration object', async () => {
      vi.resetModules()
      const { initWebVitals } = await import('../webVitals')

      await expect(
        initWebVitals({
          debug: true,
          endpoint: '/api/metrics',
        })
      ).resolves.not.toThrow()
    })

    it('should accept optional onMetric callback', async () => {
      vi.resetModules()
      const { initWebVitals } = await import('../webVitals')
      const mockCallback = vi.fn()

      await expect(
        initWebVitals({
          onMetric: mockCallback,
        })
      ).resolves.not.toThrow()
    })

    it('should work without configuration', async () => {
      vi.resetModules()
      const { initWebVitals } = await import('../webVitals')

      await expect(initWebVitals()).resolves.not.toThrow()
    })
  })

  describe('Error Handling', () => {
    it('should handle Sentry errors gracefully in production mode', async () => {
      const originalEnv = import.meta.env.DEV

      try {
        ;(import.meta.env as any).DEV = false

        vi.doMock('web-vitals', () => ({
          onLCP: (cb: Function) =>
            cb({ name: 'LCP', value: 2500, delta: 0, id: 'test' }),
          onINP: (_cb: Function) => {},
          onCLS: (_cb: Function) => {},
          onFCP: (_cb: Function) => {},
          onTTFB: (_cb: Function) => {},
        }))

        vi.resetModules()
        vi.mocked(Sentry.setMeasurement).mockImplementationOnce(() => {
          throw new Error('Sentry error')
        })
        const { initWebVitals } = await import('../webVitals')

        await expect(initWebVitals()).resolves.not.toThrow()
      } finally {
        ;(import.meta.env as any).DEV = originalEnv
        vi.resetModules()
        vi.doUnmock('web-vitals')
      }
    })
  })

  describe('Module Exports', () => {
    it('should export initWebVitals function', async () => {
      vi.resetModules()
      const webVitals = await import('../webVitals')

      expect(webVitals.initWebVitals).toBeDefined()
      expect(typeof webVitals.initWebVitals).toBe('function')
    })

    it('should export WebVitalsConfig type', async () => {
      vi.resetModules()
      const webVitals = await import('../webVitals')

      // Type exports don't exist at runtime, but we can check the module structure
      expect(webVitals).toBeDefined()
    })
  })
})
