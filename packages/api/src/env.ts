import type { MiddlewareHandler } from 'hono';
import { z } from 'zod';

export const envSchema = z.object({
  FIREBASE_SERVICE_ACCOUNT_KEY: z.string(),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_API_TOKEN: z.string(),

  AI: z.any(),
});

export type Env = z.infer<typeof envSchema>;
export interface HonoEnv {
  Bindings: Env;
}

export const validateEnv: MiddlewareHandler = (c, next) => {
  envSchema.parse(c.env);
  return next();
};
