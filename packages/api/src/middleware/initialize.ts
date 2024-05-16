import type { HonoEnv } from 'api/env';
import DB from 'api/lib/db';
import LangChain from 'api/lib/langchain';
import type { MiddlewareHandler } from 'hono';

export const initialize: MiddlewareHandler<HonoEnv> = (c, next) => {
  new LangChain(c.env);
  new DB(c.env);
  return next();
};
