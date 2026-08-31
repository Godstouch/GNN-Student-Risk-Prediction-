import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Precache the app shell (JS, CSS, HTML) so the UI loads even with
      // zero connectivity — this is what makes "offline-first" real rather
      // than just a claim in the proposal.
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            // Cache calls to the local Flask/ONNX API on the Pi.
            // NetworkFirst: try the live prediction first (fresh data),
            // fall back to the last cached response if the Pi is
            // unreachable — e.g. teacher briefly steps out of WiFi range.
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
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      // Lets you test offline behavior locally with `npm run dev`,
      // not just in a production build.
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
