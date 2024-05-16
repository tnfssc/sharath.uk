/// <reference types="vitest" />
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import 'dotenv/config';
import path from 'node:path';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { z } from 'zod';

export const envSchema = z.object({
  VITE_API_ENDPOINT: z.string().url(),
  VITE_PUBLIC_BASE_URL: z.string().url(),
});

envSchema.parse(process.env);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [imagetools(), UnoCSS(), react(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
