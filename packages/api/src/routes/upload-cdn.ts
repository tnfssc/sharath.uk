import { init } from '@paralleldrive/cuid2';
import type { HonoEnv } from 'api/env';
import { Cdn } from 'api/lib/cdn';
import type { Handler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import * as v from 'valibot';

const createId = init({ length: 5 });

export const UploadCdnQuerySchema = v.object({ ext: v.pipe(v.string(), v.nonEmpty(), v.maxLength(12)) });

export const UploadCdn: Handler<HonoEnv> = async (c) => {
  if (!c.req.raw.body) throw new HTTPException(400);

  const baseUrl = c.env.CDN_BASE_URL;
  const { ext } = v.parse(UploadCdnQuerySchema, { ext: c.req.query('ext') });

  const today = new Date();
  const key = today.getFullYear().toString() + (today.getMonth() + 1).toString() + `-${createId()}.${ext}`;

  const res = await Cdn.put(c.env, key, c.req.raw.body);

  return c.json({ url: new URL(res, baseUrl).href });
};
