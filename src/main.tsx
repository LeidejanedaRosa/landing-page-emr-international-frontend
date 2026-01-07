import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import App from './App.tsx'
import './index.css'
import { initWebVitals } from './utils/webVitals.ts'

if (import.meta.env.PROD) {
  const initSentryDeferred = async () => {
    const { initSentry } = await import('./utils/sentry.tsx')
    initSentry()
  }

  // Safari doesn't support requestIdleCallback, use setTimeout as fallback
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initSentryDeferred, { timeout: 2000 })
  } else {
    setTimeout(initSentryDeferred, 1)
  }
}

/* eslint-disable no-console */
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('Service Worker registered successfully')
      })
      .catch(async error => {
        console.error('Service Worker registration failed:', error)
        const Sentry = await import('@sentry/react')
        Sentry.captureException(error, {
          tags: { component: 'service-worker' },
          contexts: {
            serviceWorker: {
              action: 'registration',
              environment: 'production',
            },
          },
        })
      })
  })
} else if ('serviceWorker' in navigator && !import.meta.env.PROD) {
  navigator.serviceWorker
    .getRegistrations()
    .then(registrations => {
      registrations.forEach(registration => {
        registration.unregister()
      })
    })
    .catch(error => {
      console.error('Failed to unregister service workers:', error)
      // Skip Sentry in dev mode - just log the error
    })
}
/* eslint-enable no-console */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
)

if ('requestIdleCallback' in window) {
  requestIdleCallback(
    () => {
      initWebVitals({
        debug: import.meta.env.DEV,
      })
    },
    { timeout: 100 }
  )
} else {
  setTimeout(() => {
    initWebVitals({
      debug: import.meta.env.DEV,
    })
  }, 0)
}
