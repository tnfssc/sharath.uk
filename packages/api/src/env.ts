import type { MiddlewareHandler } from 'hono';
import type { UserToken } from 'web-auth-library/google';
import { z } from 'zod';

export const envSchema = z.object({
  FIREBASE_SERVICE_ACCOUNT_KEY: z.string(),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_API_TOKEN: z.string(),

  TURSO_DATABASE_URL: z.string().url(),
  TURSO_AUTH_TOKEN: z.string(),

  AI: z.any(),
});

export type Env = z.infer<typeof envSchema>;
export interface HonoEnv {
  Bindings: Env;
  Variables: {
    user: UserToken;
  };
}

export const validateEnv: MiddlewareHandler = (c, next) => {
  envSchema.parse(c.env);
  return next();
};
