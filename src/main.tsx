import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './index.css'
import { initWebVitals } from './utils/webVitals.ts'

if (import.meta.env.PROD) {
  const initSentryDeferred = async () => {
    const { initSentry } = await import('./utils/sentry.tsx')
    initSentry()
  }

  // Delay Sentry initialization until after First Contentful Paint
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initSentryDeferred, { timeout: 3000 })
  } else {
    setTimeout(initSentryDeferred, 2000)
  }
}

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(async error => {
      try {
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
      } catch {
        // Sentry unavailable; swallow gracefully
      }
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
    .catch(() => {})
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
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
