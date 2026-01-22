import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      devOptions: {
        enabled: mode === 'development',
        type: 'module',
      },

      includeAssets: [
        'icons/favicon.ico',
        'icons/apple-touch-icon.png',
        'icons/masked-icon.svg',
      ],
      manifest: {
        name: 'SpeakOn',
        short_name: 'SpeakOn',
        description: '9기 UMC 데모데이 프로젝트 SpeakOn',
        lang: 'ko-KR',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: 'icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}));
