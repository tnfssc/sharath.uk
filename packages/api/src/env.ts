import type { MiddlewareHandler } from 'hono';
import * as v from 'valibot';
import type { UserToken } from 'web-auth-library/google';

export const envSchema = v.object({
  FIREBASE_SERVICE_ACCOUNT_KEY: v.string(),
  CLOUDFLARE_ACCOUNT_ID: v.string(),
  CLOUDFLARE_API_TOKEN: v.string(),

  TURSO_DATABASE_URL: v.pipe(v.string(), v.url()),
  TURSO_AUTH_TOKEN: v.string(),

  CDN_BASE_URL: v.pipe(v.string(), v.url()),

  AI: v.any(),
});

export type Env = v.InferOutput<typeof envSchema>;
export interface HonoEnv {
  Bindings: Env;
  Variables: {
    user: UserToken & { email: string };
  };
}

export const validateEnv: MiddlewareHandler = (c, next) => {
  v.parse(envSchema, c.env);
  return next();
};
