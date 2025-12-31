import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import { securityHeaders } from './src/plugins/security-headers'

export default defineConfig({
  plugins: [
    react(),
    ...(process.env.NODE_ENV === 'production'
      ? [
          securityHeaders({
            csp: "default-src 'self'; script-src 'self' 'sha256-E1xA964fM7OP0+1NOZ7mloL70P6XbVKzT4s4mPv35GQ='; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; worker-src 'self' blob:; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';",
            frameOptions: 'DENY',
            contentTypeOptions: true,
            referrerPolicy: 'strict-origin-when-cross-origin',
            permissionsPolicy: 'camera=(), microphone=(), geolocation=()',
          }),
        ]
      : []),
    ...(process.env.NODE_ENV === 'production'
      ? [
          VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            includeAssets: [
              'favicon.svg',
              'favicon.ico',
              'favicon-32x32.png',
              'favicon-16x16.png',
              'apple-touch-icon.png',
              'pwa-192x192.png',
              'pwa-512x512.png',
            ],
            manifest: {
              name: 'EMR Internacional - APH Tático',
              short_name: 'EMR Internacional',
              description:
                'Cursos de Atendimento Pré-Hospitalar Tático e Emergência em Áreas Remotas',
              theme_color: '#000000',
              background_color: '#ffffff',
              display: 'standalone',
              orientation: 'portrait',
              scope: '/',
              start_url: '/',
              id: '/',
              icons: [
                {
                  src: '/pwa-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                },
                {
                  src: '/pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                },
                {
                  src: '/pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'any maskable',
                },
              ],
            },
            workbox: {
              globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif}'],
              maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
              runtimeCaching: [
                {
                  urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'google-fonts-cache',
                    expiration: {
                      maxEntries: 10,
                      maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
                    },
                  },
                },
                {
                  urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'gstatic-fonts-cache',
                    expiration: {
                      maxEntries: 10,
                      maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
                    },
                  },
                },
                {
                  urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'images',
                    expiration: {
                      maxEntries: 60,
                      maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                    },
                  },
                },
              ],
            },
            devOptions: {
              enabled: false,
            },
          }),
        ]
      : []),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          helmet: ['react-helmet-async'],
          icons: ['lucide-react'],
        },
        assetFileNames: assetInfo => {
          if (!assetInfo.name) return `assets/[name]-[hash][extname]`
          const info = assetInfo.name.split('.')
          const extType = info[info.length - 1]

          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(extType)) {
            return `images/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
      },
    },
    assetsInlineLimit: 0,
    cssCodeSplit: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
})
