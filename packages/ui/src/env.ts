import * as v from 'valibot';

export const envSchema = v.object({
  VITE_API_ENDPOINT: v.optional(v.pipe(v.string(), v.url()), 'https://sharathuk-api.tnfssc.workers.dev'),
  VITE_PUBLIC_BASE_URL: v.optional(v.pipe(v.string(), v.url()), 'https://www.sharath.uk'),
  VITE_POSTHOG_TOKEN: v.optional(v.string(), 'phc_vDQlNcqbiH7rMqcKFJAlBiXPAmzY4wT53ln9VvmmnFM'),
  VITE_POSTHOG_API_HOST: v.optional(v.string(), 'https://us.i.posthog.com'),
  DEV: v.optional(v.boolean(), false),
  PROD: v.optional(v.boolean(), true),
});

export const env = v.parse(envSchema, {
  VITE_API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT as string,
  VITE_PUBLIC_BASE_URL: import.meta.env.VITE_PUBLIC_BASE_URL as string,
  VITE_POSTHOG_TOKEN: import.meta.env.VITE_POSTHOG_TOKEN as string,
  VITE_POSTHOG_API_HOST: import.meta.env.VITE_POSTHOG_API_HOST as string,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
});

export type Env = typeof env;
