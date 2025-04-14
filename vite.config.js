import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'ZebraOps PWA',
        short_name: 'ZebraOps',
        description: 'The AI + Automation system for Zebra Industries',
        theme_color: '#FFD700',
        background_color: '#0D1F2D',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/zebraops-icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/zebraops-icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 5173
  }
})
