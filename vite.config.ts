import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Jaoo',
        short_name: 'Jaoo',
        description: 'Seu espaço para criar, publicar e crescer.',
        theme_color: '#6d28d9',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/pwa-192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/pwa-512.svg', sizes: '512x512', type: 'image/svg+xml' },
        ],
      },
      workbox: { navigateFallbackDenylist: [/^\/api\//], runtimeCaching: [] },
    }),
  ],
  resolve: { alias: { '@': `${import.meta.dirname}/src` } },
  build: { chunkSizeWarningLimit: 600 },
  server: { port: 5173, strictPort: true },
})
