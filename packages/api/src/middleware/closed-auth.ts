import { type HonoEnv } from 'api/env';
import type { MiddlewareHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';

const ALLOWED_USER_EMAILS = ['tnfssc@gmail.com'];

export const closedAuth: MiddlewareHandler<HonoEnv> = async (c, next) => {
  const user = c.get('user');
  const userEmail = user.email;

  if (!ALLOWED_USER_EMAILS.includes(userEmail)) throw new HTTPException(401);

  return next();
};
