import { defineConfig, devices } from '@playwright/test'

// Performance tests run against a production build (vite build + vite preview).
// LCP is a Chromium-only Web Vital — other browsers are excluded intentionally.
export default defineConfig({
  testDir: './tests',
  testMatch: '**/performance.spec.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  reporter: 'html',
  timeout: 120 * 1000,

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:3000',
    reuseExistingServer: false,
    timeout: 180 * 1000,
  },
})
