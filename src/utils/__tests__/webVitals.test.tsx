/// <reference types="vite/client" />
import * as Sentry from '@sentry/react'
import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@sentry/react', () => ({
  setMeasurement: vi.fn(),
  captureMessage: vi.fn(),
}))

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

describe('sendToGoogleAnalytics (via initWebVitals)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetch.mockResolvedValue({ ok: true })
  })

  afterEach(() => {
    vi.resetModules()
  })

  it('não quebra quando gtag não está disponível', async () => {
    ;(import.meta.env as any).DEV = false
    vi.resetModules()

    vi.doMock('web-vitals', () => ({
      onLCP: (cb: (m: object) => void) =>
        cb({
          name: 'LCP',
          value: 1000,
          delta: 0,
          id: 'test',
          navigationType: 'navigate',
        }),
      onINP: (_cb: (m: object) => void) => {},
      onCLS: (_cb: (m: object) => void) => {},
      onFCP: (_cb: (m: object) => void) => {},
      onTTFB: (_cb: (m: object) => void) => {},
    }))

    const { initWebVitals } = await import('../webVitals')
    await expect(initWebVitals()).resolves.not.toThrow()
  })

  it('chama gtag quando disponível no window', async () => {
    ;(import.meta.env as any).DEV = false
    vi.resetModules()

    const gtagMock = vi.fn()
    ;(window as any).gtag = gtagMock

    vi.doMock('web-vitals', () => ({
      onLCP: (cb: (m: object) => void) =>
        cb({
          name: 'LCP',
          value: 1000,
          delta: 0,
          id: 'v1',
          navigationType: 'navigate',
        }),
      onINP: (_cb: (m: object) => void) => {},
      onCLS: (_cb: (m: object) => void) => {},
      onFCP: (_cb: (m: object) => void) => {},
      onTTFB: (_cb: (m: object) => void) => {},
    }))

    const { initWebVitals } = await import('../webVitals')
    await initWebVitals()

    expect(gtagMock).toHaveBeenCalledWith(
      'event',
      'LCP',
      expect.objectContaining({ event_category: 'Web Vitals' })
    )

    delete (window as any).gtag
  })

  it('escala CLS por 10000 para Google Analytics', async () => {
    ;(import.meta.env as any).DEV = false
    vi.resetModules()

    const gtagMock = vi.fn()
    ;(window as any).gtag = gtagMock

    vi.doMock('web-vitals', () => ({
      onLCP: (_cb: (m: object) => void) => {},
      onINP: (_cb: (m: object) => void) => {},
      onCLS: (cb: (m: object) => void) =>
        cb({
          name: 'CLS',
          value: 0.05,
          delta: 0,
          id: 'cls1',
          navigationType: 'navigate',
        }),
      onFCP: (_cb: (m: object) => void) => {},
      onTTFB: (_cb: (m: object) => void) => {},
    }))

    const { initWebVitals } = await import('../webVitals')
    await initWebVitals()

    expect(gtagMock).toHaveBeenCalledWith(
      'event',
      'CLS',
      expect.objectContaining({ value: Math.round(0.05 * 10000) })
    )

    delete (window as any).gtag
  })
})

describe('sendMetricToEndpoint (via initWebVitals)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetch.mockResolvedValue({ ok: true })
  })

  afterEach(() => {
    vi.resetModules()
  })

  it('envia POST para endpoint quando configurado', async () => {
    ;(import.meta.env as any).DEV = false
    vi.resetModules()

    vi.doMock('web-vitals', () => ({
      onLCP: (cb: (m: object) => void) =>
        cb({
          name: 'LCP',
          value: 1500,
          delta: 0,
          id: 'lcp1',
          navigationType: 'navigate',
        }),
      onINP: (_cb: (m: object) => void) => {},
      onCLS: (_cb: (m: object) => void) => {},
      onFCP: (_cb: (m: object) => void) => {},
      onTTFB: (_cb: (m: object) => void) => {},
    }))

    const { initWebVitals } = await import('../webVitals')
    await initWebVitals({ endpoint: 'https://api.example.com/metrics' })

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.example.com/metrics',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
  })

  it('não envia para endpoint quando não configurado', async () => {
    ;(import.meta.env as any).DEV = false
    vi.resetModules()

    vi.doMock('web-vitals', () => ({
      onLCP: (cb: (m: object) => void) =>
        cb({
          name: 'LCP',
          value: 1500,
          delta: 0,
          id: 'lcp2',
          navigationType: 'navigate',
        }),
      onINP: (_cb: (m: object) => void) => {},
      onCLS: (_cb: (m: object) => void) => {},
      onFCP: (_cb: (m: object) => void) => {},
      onTTFB: (_cb: (m: object) => void) => {},
    }))

    const { initWebVitals } = await import('../webVitals')
    await initWebVitals()

    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('não quebra quando fetch falha (erro silencioso)', async () => {
    ;(import.meta.env as any).DEV = false
    vi.resetModules()
    mockFetch.mockRejectedValue(new Error('Rede indisponível'))

    vi.doMock('web-vitals', () => ({
      onLCP: (cb: (m: object) => void) =>
        cb({
          name: 'LCP',
          value: 1500,
          delta: 0,
          id: 'lcp3',
          navigationType: 'navigate',
        }),
      onINP: (_cb: (m: object) => void) => {},
      onCLS: (_cb: (m: object) => void) => {},
      onFCP: (_cb: (m: object) => void) => {},
      onTTFB: (_cb: (m: object) => void) => {},
    }))

    const { initWebVitals } = await import('../webVitals')
    await expect(
      initWebVitals({ endpoint: 'https://api.example.com/metrics' })
    ).resolves.not.toThrow()
  })
})

describe('sendToSentry (via initWebVitals)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetch.mockResolvedValue({ ok: true })
  })

  afterEach(() => {
    vi.resetModules()
  })

  it('chama setMeasurement com unit millisecond para LCP', async () => {
    ;(import.meta.env as any).DEV = false
    vi.resetModules()

    vi.doMock('web-vitals', () => ({
      onLCP: (cb: (m: object) => void) =>
        cb({
          name: 'LCP',
          value: 2000,
          delta: 0,
          id: 'lcp-prod',
          navigationType: 'navigate',
        }),
      onINP: (_cb: (m: object) => void) => {},
      onCLS: (_cb: (m: object) => void) => {},
      onFCP: (_cb: (m: object) => void) => {},
      onTTFB: (_cb: (m: object) => void) => {},
    }))

    const { initWebVitals } = await import('../webVitals')
    await initWebVitals()

    expect(Sentry.setMeasurement).toHaveBeenCalledWith(
      'LCP',
      2000,
      'millisecond'
    )
  })

  it('chama setMeasurement com unit ratio para CLS', async () => {
    ;(import.meta.env as any).DEV = false
    vi.resetModules()

    vi.doMock('web-vitals', () => ({
      onLCP: (_cb: (m: object) => void) => {},
      onINP: (_cb: (m: object) => void) => {},
      onCLS: (cb: (m: object) => void) =>
        cb({
          name: 'CLS',
          value: 0.1,
          delta: 0,
          id: 'cls-prod',
          navigationType: 'navigate',
        }),
      onFCP: (_cb: (m: object) => void) => {},
      onTTFB: (_cb: (m: object) => void) => {},
    }))

    const { initWebVitals } = await import('../webVitals')
    await initWebVitals()

    expect(Sentry.setMeasurement).toHaveBeenCalledWith('CLS', 0.1, 'ratio')
  })

  it('chama captureMessage para métrica "poor"', async () => {
    ;(import.meta.env as any).DEV = false
    vi.resetModules()

    vi.doMock('web-vitals', () => ({
      onLCP: (cb: (m: object) => void) =>
        cb({
          name: 'LCP',
          value: 9999,
          delta: 0,
          id: 'lcp-poor',
          navigationType: 'navigate',
        }),
      onINP: (_cb: (m: object) => void) => {},
      onCLS: (_cb: (m: object) => void) => {},
      onFCP: (_cb: (m: object) => void) => {},
      onTTFB: (_cb: (m: object) => void) => {},
    }))

    const { initWebVitals } = await import('../webVitals')
    await initWebVitals()

    expect(Sentry.captureMessage).toHaveBeenCalledWith(
      'Poor Web Vital: LCP',
      expect.objectContaining({ level: 'warning' })
    )
  })

  it('não chama captureMessage para métrica "good"', async () => {
    ;(import.meta.env as any).DEV = false
    vi.resetModules()

    vi.doMock('web-vitals', () => ({
      onLCP: (cb: (m: object) => void) =>
        cb({
          name: 'LCP',
          value: 1000,
          delta: 0,
          id: 'lcp-good',
          navigationType: 'navigate',
        }),
      onINP: (_cb: (m: object) => void) => {},
      onCLS: (_cb: (m: object) => void) => {},
      onFCP: (_cb: (m: object) => void) => {},
      onTTFB: (_cb: (m: object) => void) => {},
    }))

    const { initWebVitals } = await import('../webVitals')
    await initWebVitals()

    expect(Sentry.captureMessage).not.toHaveBeenCalled()
  })
})

describe('initWebVitals - deduplicação de config', () => {
  afterEach(() => {
    vi.resetModules()
  })

  it('não reinicializa quando config é idêntica', async () => {
    vi.resetModules()

    const webVitalsMock = {
      onLCP: vi.fn(),
      onINP: vi.fn(),
      onCLS: vi.fn(),
      onFCP: vi.fn(),
      onTTFB: vi.fn(),
    }

    vi.doMock('web-vitals', () => webVitalsMock)

    const { initWebVitals } = await import('../webVitals')
    await initWebVitals({ debug: false })
    await initWebVitals({ debug: false })

    expect(webVitalsMock.onLCP).toHaveBeenCalledTimes(1)
  })

  it('reinicializa quando config muda', async () => {
    vi.resetModules()

    const webVitalsMock = {
      onLCP: vi.fn(),
      onINP: vi.fn(),
      onCLS: vi.fn(),
      onFCP: vi.fn(),
      onTTFB: vi.fn(),
    }

    vi.doMock('web-vitals', () => webVitalsMock)

    const { initWebVitals } = await import('../webVitals')
    await initWebVitals({ debug: false })
    await initWebVitals({ debug: true })

    expect(webVitalsMock.onLCP).toHaveBeenCalledTimes(2)
  })

  it('não quebra quando web-vitals falha ao carregar', async () => {
    vi.resetModules()
    vi.doMock('web-vitals', () => {
      throw new Error('Módulo não disponível')
    })

    const { initWebVitals } = await import('../webVitals')
    await expect(initWebVitals({ debug: true })).resolves.not.toThrow()
  })

  it('chama onMetric do config quando métrica chega', async () => {
    ;(import.meta.env as any).DEV = false
    vi.resetModules()

    vi.doMock('web-vitals', () => ({
      onLCP: (cb: (m: object) => void) =>
        cb({
          name: 'LCP',
          value: 1000,
          delta: 0,
          id: 'x',
          navigationType: 'navigate',
        }),
      onINP: (_cb: (m: object) => void) => {},
      onCLS: (_cb: (m: object) => void) => {},
      onFCP: (_cb: (m: object) => void) => {},
      onTTFB: (_cb: (m: object) => void) => {},
    }))

    const onMetric = vi.fn()
    const { initWebVitals } = await import('../webVitals')
    await initWebVitals({ onMetric })

    expect(onMetric).toHaveBeenCalledOnce()
  })
})

describe('useWebVitals', () => {
  afterEach(() => {
    vi.resetModules()
  })

  it('chama initWebVitals ao montar sem erros', async () => {
    vi.resetModules()

    vi.doMock('web-vitals', () => ({
      onLCP: vi.fn(),
      onINP: vi.fn(),
      onCLS: vi.fn(),
      onFCP: vi.fn(),
      onTTFB: vi.fn(),
    }))

    const { useWebVitals } = await import('../webVitals')
    expect(() => renderHook(() => useWebVitals())).not.toThrow()
  })
})

describe('WebVitalsReporter', () => {
  afterEach(() => {
    vi.resetModules()
  })

  it('renderiza sem erro e retorna null', async () => {
    vi.resetModules()

    vi.doMock('web-vitals', () => ({
      onLCP: vi.fn(),
      onINP: vi.fn(),
      onCLS: vi.fn(),
      onFCP: vi.fn(),
      onTTFB: vi.fn(),
    }))

    const { WebVitalsReporter } = await import('../webVitals')
    const { render } = await import('../../test/test-utils')
    const { container } = render(<WebVitalsReporter />)
    expect(container.firstChild).toBeNull()
  })
})
