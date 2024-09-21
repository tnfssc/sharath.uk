import type { HonoEnv } from 'api/env';
import DB, { viewCountTable } from 'api/lib/db';
import { eq, sql } from 'drizzle-orm';
import type { Handler } from 'hono';
import * as v from 'valibot';

export const ViewCountSchema = v.pipe(v.string(), v.nonEmpty(), v.maxLength(100));

export const ViewCountSpy: Handler<HonoEnv> = async (c) => {
  console.log(c.req.query('name'));
  const spyName = v.parse(ViewCountSchema, c.req.query('name'));
  const spyCount = await DB.db.select().from(viewCountTable).where(eq(viewCountTable.name, spyName));
  if (spyCount.length === 0) await DB.db.insert(viewCountTable).values({ name: spyName, count: 1 });
  else await DB.db.update(viewCountTable).set({ count: sql`${viewCountTable.count} + 1` });

  c.header('Content-Type', 'image/svg+xml');
  return c.body('<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" height="0" width="0"/>');
};

export const ViewCountValue: Handler<HonoEnv> = async (c) => {
  const spyName = v.parse(ViewCountSchema, c.req.query('name'));
  const spyCount = await DB.db.select().from(viewCountTable).where(eq(viewCountTable.name, spyName));
  if (spyCount.length === 0) return c.json({ count: 0 });
  return c.json({ count: spyCount[0].count });
};

export const AllViewCounts: Handler<HonoEnv> = async (c) => {
  const spyCounts = await DB.db.select().from(viewCountTable);
  return c.json(spyCounts);
};
