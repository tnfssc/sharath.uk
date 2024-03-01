/// <reference types="vitest" />
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
// @ts-expect-error
import path from 'node:path';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), million.vite({ auto: true, telemetry: false }), react(), TanStackRouterVite()],
  resolve: {
    alias: {
      // @ts-expect-error
      '@': path.resolve(__dirname, './src'),
    },
  },
});
