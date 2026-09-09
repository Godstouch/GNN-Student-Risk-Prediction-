import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'earlyflag-api-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
            },
          },
        ],
      },
      manifest: {
        name: 'EarlyFlag — Dropout Risk Dashboard',
        short_name: 'EarlyFlag',
        description:
          'Offline-first dropout risk dashboard for Ghanaian JHS teachers',
        theme_color: '#1E3A5F',
        background_color: '#F8FAFC',
        display: 'standalone',
        start_url: '/dashboard',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      // Off by default during day-to-day development — the dev-mode
      // service worker precaches the app shell and can silently serve
      // stale JS/CSS while you're actively editing. Flip to true only
      // when you specifically need to test offline/install behavior,
      // then flip it back off afterward.
      devOptions: {
        enabled: false,
      },
    }),
  ],
});