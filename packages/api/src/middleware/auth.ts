import { type HonoEnv } from 'api/env';
import { verifyIdToken } from 'api/lib/firebase';
import type { MiddlewareHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const auth: MiddlewareHandler<HonoEnv> = async (c, next) => {
  const idToken = c.req.header('Authorization')?.split('Bearer ')[1];
  if (!idToken) throw new HTTPException(401);

  const decodedToken = await verifyIdToken(c.env, idToken).catch(() => null);
  if (!decodedToken) throw new HTTPException(401);
  if (decodedToken.email_verified === false) throw new HTTPException(401);

  c.set('user', decodedToken);
  return next();
};
