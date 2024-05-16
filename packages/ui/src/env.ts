import { z } from 'zod';

export const envSchema = z.object({
  VITE_API_ENDPOINT: z.string().url().optional().default('https://sharathuk-api.tnfssc.workers.dev'),
  VITE_PUBLIC_BASE_URL: z.string().url().optional().default('https://www.sharath.uk'),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse({
  VITE_API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT as string,
  VITE_PUBLIC_BASE_URL: import.meta.env.VITE_PUBLIC_BASE_URL as string,
});
