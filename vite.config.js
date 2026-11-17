import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // Reviews API (Cloudflare Pages Functions) runs on 8788 via `npm run dev:api`.
    proxy: { '/api': 'http://127.0.0.1:8788' },
  },
  preview: {
    proxy: { '/api': 'http://127.0.0.1:8788' },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
