import * as Sentry from '@sentry/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { render, renderHook, screen } from '../../test/test-utils'
import {
  initSentry,
  useSentryCapture,
  withSentryErrorBoundary,
} from '../sentry'

vi.mock('@sentry/react', () => ({
  init: vi.fn(),
  browserTracingIntegration: vi.fn(() => ({ name: 'browserTracing' })),
  replayIntegration: vi.fn(() => ({ name: 'replay' })),
  withErrorBoundary: vi.fn(Component => {
    return function WrappedComponent(props: any) {
      return <Component {...props} />
    }
  }),
  withScope: vi.fn(callback => {
    const scope = {
      setContext: vi.fn(),
    }
    callback(scope)
  }),
  captureException: vi.fn(),
  captureMessage: vi.fn(),
}))

const originalEnv = { ...import.meta.env }

describe('sentry', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    Object.assign(import.meta.env, originalEnv)
  })

  describe('initSentry', () => {
    it('should not initialize in development mode', () => {
      // @ts-ignore - mocking env
      import.meta.env.PROD = false

      initSentry()

      expect(Sentry.init).not.toHaveBeenCalled()
    })

    it('should log error if DSN is not configured in production', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      // @ts-ignore - mocking env
      import.meta.env.PROD = true
      // Use delete to truly remove the DSN
      // @ts-ignore - mocking env
      delete import.meta.env.VITE_SENTRY_DSN

      initSentry()

      expect(consoleSpy).toHaveBeenCalledWith('Sentry DSN not configured')
      expect(Sentry.init).not.toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('should initialize Sentry with correct config in production', () => {
      // @ts-ignore - mocking env
      import.meta.env.PROD = true
      // @ts-ignore - mocking env
      import.meta.env.VITE_SENTRY_DSN = 'https://test@sentry.io/123'
      // @ts-ignore - mocking env
      import.meta.env.MODE = 'production'

      initSentry()

      expect(Sentry.init).toHaveBeenCalledWith(
        expect.objectContaining({
          dsn: 'https://test@sentry.io/123',
          environment: 'production',
          tracesSampleRate: 0.1,
          replaysSessionSampleRate: 0.1,
          replaysOnErrorSampleRate: 1.0,
        })
      )
    })

    it('should include browser tracing integration', () => {
      // @ts-ignore
      import.meta.env.PROD = true
      // @ts-ignore
      import.meta.env.VITE_SENTRY_DSN = 'https://test@sentry.io/123'

      initSentry()

      expect(Sentry.browserTracingIntegration).toHaveBeenCalled()
    })

    it('should include replay integration with privacy settings', () => {
      // @ts-ignore
      import.meta.env.PROD = true
      // @ts-ignore
      import.meta.env.VITE_SENTRY_DSN = 'https://test@sentry.io/123'

      initSentry()

      expect(Sentry.replayIntegration).toHaveBeenCalledWith({
        maskAllText: true,
        blockAllMedia: true,
      })
    })

    it('should have beforeSend filter for Non-Error promise rejection', () => {
      // @ts-ignore
      import.meta.env.PROD = true
      // @ts-ignore
      import.meta.env.VITE_SENTRY_DSN = 'https://test@sentry.io/123'

      initSentry()

      const initCall = (Sentry.init as ReturnType<typeof vi.fn>).mock
        .calls[0][0]
      const beforeSend = initCall.beforeSend

      const event = {
        exception: {
          values: [{ value: 'Non-Error promise rejection captured' }],
        },
      }

      expect(beforeSend(event)).toBeNull()
    })

    it('should have beforeSend filter for ResizeObserver loop limit', () => {
      // @ts-ignore
      import.meta.env.PROD = true
      // @ts-ignore
      import.meta.env.VITE_SENTRY_DSN = 'https://test@sentry.io/123'

      initSentry()

      const initCall = (Sentry.init as ReturnType<typeof vi.fn>).mock
        .calls[0][0]
      const beforeSend = initCall.beforeSend

      const event = {
        exception: {
          values: [{ value: 'ResizeObserver loop limit exceeded' }],
        },
      }

      expect(beforeSend(event)).toBeNull()
    })

    it('should pass through other errors in beforeSend', () => {
      // @ts-ignore
      import.meta.env.PROD = true
      // @ts-ignore
      import.meta.env.VITE_SENTRY_DSN = 'https://test@sentry.io/123'

      initSentry()

      const initCall = (Sentry.init as ReturnType<typeof vi.fn>).mock
        .calls[0][0]
      const beforeSend = initCall.beforeSend

      const event = {
        exception: {
          values: [{ value: 'Real error message' }],
        },
      }

      expect(beforeSend(event)).toBe(event)
    })

    it('should set component tag in initial scope', () => {
      // @ts-ignore
      import.meta.env.PROD = true
      // @ts-ignore
      import.meta.env.VITE_SENTRY_DSN = 'https://test@sentry.io/123'

      initSentry()

      expect(Sentry.init).toHaveBeenCalledWith(
        expect.objectContaining({
          initialScope: {
            tags: {
              component: 'EMR-Internacional-Frontend',
            },
          },
        })
      )
    })
  })

  describe('withSentryErrorBoundary', () => {
    it('should wrap component with Sentry error boundary', () => {
      const TestComponent = () => <div>Test</div>
      withSentryErrorBoundary(TestComponent)

      expect(Sentry.withErrorBoundary).toHaveBeenCalledWith(
        TestComponent,
        expect.objectContaining({
          fallback: expect.any(Function),
          beforeCapture: expect.any(Function),
        })
      )
    })

    it('should render wrapped component correctly', () => {
      const TestComponent = () => <div data-testid='test'>Test Content</div>
      const WrappedComponent = withSentryErrorBoundary(TestComponent)

      render(<WrappedComponent />)

      expect(screen.getByTestId('test')).toBeInTheDocument()
    })
  })

  describe('useSentryCapture', () => {
    it('should return captureError and captureMessage functions', () => {
      const { result } = renderHook(() => useSentryCapture())

      expect(result.current.captureError).toBeDefined()
      expect(result.current.captureMessage).toBeDefined()
      expect(typeof result.current.captureError).toBe('function')
      expect(typeof result.current.captureMessage).toBe('function')
    })

    it('should not capture error in development mode', () => {
      // @ts-ignore
      import.meta.env.PROD = false

      const { result } = renderHook(() => useSentryCapture())
      result.current.captureError(new Error('Test error'))

      expect(Sentry.captureException).not.toHaveBeenCalled()
    })

    it('should not capture message in development mode', () => {
      // @ts-ignore
      import.meta.env.PROD = false

      const { result } = renderHook(() => useSentryCapture())
      result.current.captureMessage('Test message')

      expect(Sentry.captureMessage).not.toHaveBeenCalled()
    })

    it('should capture error with context in production', () => {
      // @ts-ignore
      import.meta.env.PROD = true

      const { result } = renderHook(() => useSentryCapture())
      const error = new Error('Test error')
      const context = { userId: '123' }

      result.current.captureError(error, context)

      expect(Sentry.withScope).toHaveBeenCalled()
      expect(Sentry.captureException).toHaveBeenCalledWith(error)

      const scopeCallback = (Sentry.withScope as ReturnType<typeof vi.fn>).mock
        .calls[0][0]
      const mockScope = { setContext: vi.fn() }
      scopeCallback(mockScope)
      expect(mockScope.setContext).toHaveBeenCalledWith('errorContext', context)
    })

    it('should capture error without context in production', () => {
      // @ts-ignore
      import.meta.env.PROD = true

      const { result } = renderHook(() => useSentryCapture())
      const error = new Error('Test error')

      result.current.captureError(error)

      expect(Sentry.withScope).toHaveBeenCalled()
      expect(Sentry.captureException).toHaveBeenCalledWith(error)

      const scopeCallback = (Sentry.withScope as ReturnType<typeof vi.fn>).mock
        .calls[0][0]
      const mockScope = { setContext: vi.fn() }
      scopeCallback(mockScope)
      expect(mockScope.setContext).not.toHaveBeenCalled()
    })

    it('should capture message with default level in production', () => {
      // @ts-ignore
      import.meta.env.PROD = true

      const { result } = renderHook(() => useSentryCapture())
      result.current.captureMessage('Test message')

      expect(Sentry.captureMessage).toHaveBeenCalledWith('Test message', 'info')
    })

    it('should capture message with custom level in production', () => {
      // @ts-ignore
      import.meta.env.PROD = true

      const { result } = renderHook(() => useSentryCapture())
      result.current.captureMessage('Test warning', 'warning')

      expect(Sentry.captureMessage).toHaveBeenCalledWith(
        'Test warning',
        'warning'
      )
    })
  })

  describe('error boundary fallback', () => {
    it('should have fallback with error message', () => {
      const withErrorBoundaryCalls = (
        Sentry.withErrorBoundary as ReturnType<typeof vi.fn>
      ).mock.calls

      const TestComponent = () => <div>Test</div>
      withSentryErrorBoundary(TestComponent)

      expect(withErrorBoundaryCalls.length).toBeGreaterThan(0)
      const options = withErrorBoundaryCalls[0][1]
      expect(options.fallback).toBeDefined()
    })

    it('should have beforeCapture that sets tags', () => {
      const TestComponent = () => <div>Test</div>
      withSentryErrorBoundary(TestComponent)

      const withErrorBoundaryCalls = (
        Sentry.withErrorBoundary as ReturnType<typeof vi.fn>
      ).mock.calls
      const options = withErrorBoundaryCalls[0][1]

      const mockScope = {
        setTag: vi.fn(),
        setLevel: vi.fn(),
      }

      const result = options.beforeCapture(mockScope)

      expect(mockScope.setTag).toHaveBeenCalledWith('errorBoundary', true)
      expect(mockScope.setLevel).toHaveBeenCalledWith('error')
      expect(result).toBe(mockScope)
    })
  })
})
