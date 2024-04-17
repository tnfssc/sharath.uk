/// <reference types="vitest" />
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import path from 'node:path';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [imagetools(), UnoCSS(), million.vite({ auto: true, telemetry: false }), react(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
