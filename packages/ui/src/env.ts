import { z } from 'zod';

export const envSchema = z.object({
  VITE_API_ENDPOINT: z.string().url(),
  VITE_PUBLIC_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse({
  VITE_API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT as string,
  VITE_PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL as string,
});
