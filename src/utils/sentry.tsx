import React from 'react'

import * as Sentry from '@sentry/react'

export const initSentry = () => {
  if (import.meta.env.PROD) {
    const dsn = import.meta.env.VITE_SENTRY_DSN
    if (!dsn) {
      // eslint-disable-next-line no-console
      console.error('Sentry DSN not configured')
      return
    }
    Sentry.init({
      dsn,
      environment: import.meta.env.MODE,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          // Privacy: Masking habilitado para compliance LGPD/GDPR/HIPAA
          // Previne captura de PII (dados pessoais, médicos, contato)
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,

      beforeSend(event) {
        if (event.exception) {
          const error = event.exception.values?.[0]
          if (error?.value?.includes('Non-Error promise rejection')) {
            return null
          }
          if (error?.value?.includes('ResizeObserver loop limit exceeded')) {
            return null
          }
        }
        return event
      },

      initialScope: {
        tags: {
          component: 'EMR-Internacional-Frontend',
        },
      },
    })
  }
}

export const withSentryErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  return Sentry.withErrorBoundary(Component, {
    fallback: ({ error, resetError }) => (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center'>
          <div className='w-16 h-16 mx-auto mb-4 text-error-500'>
            <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
          </div>
          <h1 className='text-xl font-semibold text-gray-900 mb-2'>
            Oops! Algo deu errado
          </h1>
          <p className='text-gray-600 mb-4'>
            Encontramos um problema inesperado. Nossa equipe foi notificada.
          </p>
          <button
            onClick={resetError}
            className='w-full bg-primary text-secondary px-4 py-2 rounded-lg font-medium hover:bg-primary-800 transition-colors'
          >
            Tentar novamente
          </button>
          {import.meta.env.DEV && (
            <details className='mt-4 text-left'>
              <summary className='cursor-pointer text-sm text-gray-500'>
                Detalhes técnicos (DEV)
              </summary>
              <pre className='mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto'>
                {error?.toString()}
              </pre>
            </details>
          )}
        </div>
      </div>
    ),
    beforeCapture: scope => {
      scope.setTag('errorBoundary', true)
      scope.setLevel('error')
      return scope
    },
  })
}

export const useSentryCapture = () => {
  const captureError = (error: Error, context?: Record<string, any>) => {
    if (!import.meta.env.PROD) return
    Sentry.withScope(scope => {
      if (context) {
        scope.setContext('errorContext', context)
      }
      Sentry.captureException(error)
    })
  }

  const captureMessage = (
    message: string,
    level: Sentry.SeverityLevel = 'info'
  ) => {
    if (!import.meta.env.PROD) return
    Sentry.captureMessage(message, level)
  }

  return { captureError, captureMessage }
}
