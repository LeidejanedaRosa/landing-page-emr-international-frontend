import { StrictMode } from 'react'

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

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        // Service Worker registrado com sucesso
      })
      .catch(() => {
        // Falha no registro do Service Worker
      })
  })
} else if ('serviceWorker' in navigator && !import.meta.env.PROD) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      registration.unregister()
    })
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
)
