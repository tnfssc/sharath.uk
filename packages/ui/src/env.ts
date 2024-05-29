import * as v from 'valibot';

export const envSchema = v.object({
  VITE_API_ENDPOINT: v.optional(v.pipe(v.string(), v.url()), 'https://sharathuk-api.tnfssc.workers.dev'),
  VITE_PUBLIC_BASE_URL: v.optional(v.pipe(v.string(), v.url()), "'https://www.sharath.uk'"),
});

export const env = v.parse(envSchema, {
  VITE_API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT as string,
  VITE_PUBLIC_BASE_URL: import.meta.env.VITE_PUBLIC_BASE_URL as string,
});

export type Env = typeof env;
