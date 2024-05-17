/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dns from 'node:dns'
dns.setDefaultResultOrder('verbatim')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      host: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          port: 3000,
          changeOrigin: true,
          //rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        },
      },
    },
});