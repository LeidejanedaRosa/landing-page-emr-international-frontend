import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true, // Permite acesso externo
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2022', // Suporte a recursos modernos do JavaScript
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  preview: {
    port: 3000,
    host: true,
  },
})
