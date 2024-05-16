import type { HonoEnv } from 'api/env';
import DB, { linkShortenerTable } from 'api/lib/db';
import { eq } from 'drizzle-orm';
import type { Handler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';

export const ShortenerCreateQuerySchema = z.object({ url: z.string().url() });

export const ShortenerCreate: Handler<HonoEnv> = async (c) => {
  const { url } = ShortenerCreateQuerySchema.parse({ url: c.req.query('url') });
  const user = c.get('user');

  const result = await DB.db.insert(linkShortenerTable).values({ url, createdBy: user.user_id }).returning();
  if (result.length === 0) throw new HTTPException(500);

  return c.json(result[0]);
};

export const ShortenerExpandQuerySchema = z.object({ id: z.string() });

export const ShortenerExpand: Handler<HonoEnv> = async (c) => {
  const { id } = ShortenerExpandQuerySchema.parse({ id: c.req.query('id') });

  const result = await DB.db.select().from(linkShortenerTable).where(eq(linkShortenerTable.id, id));
  if (result.length === 0) throw new HTTPException(404);

  return c.json(result[0]);
};
