import { StrictMode } from 'react'

import * as Sentry from '@sentry/react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import App from './App.tsx'
import './index.css'
import { initSentry } from './utils/sentry.tsx'
import { initWebVitals } from './utils/webVitals.ts'

initSentry()
initWebVitals({
  debug: import.meta.env.DEV,
})

/* eslint-disable no-console */
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('Service Worker registered successfully')
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error)
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
      Sentry.captureException(error, {
        tags: { component: 'service-worker' },
        contexts: {
          serviceWorker: {
            action: 'unregistration',
            environment: 'development',
          },
        },
      })
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
