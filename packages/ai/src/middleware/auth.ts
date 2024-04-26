import { envSchema } from 'ai/env';
import { verifyIdToken } from 'ai/lib/firebase';
import type { MiddlewareHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const isAuthorized = async (_env: unknown, idToken: string | undefined) => {
  const env = envSchema.parse(_env);

  if (!idToken) return false;

  const decodedToken = await verifyIdToken(env, idToken).catch(() => null);

  if (decodedToken?.email_verified === false) {
    return false;
  }

  return true;
};

export const auth: MiddlewareHandler = async (c, next) => {
  const idToken = c.req.header('Authorization')?.split('Bearer ')[1];
  const authorized = await isAuthorized(c.env, idToken);
  if (!authorized) throw new HTTPException(401);
  return next();
};
