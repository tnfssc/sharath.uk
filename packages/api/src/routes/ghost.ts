import GhostContentAPI from '@tryghost/content-api';
import type { HonoEnv } from 'api/env';
import { cache } from 'api/lib/cache';
import type { Handler } from 'hono';
import * as v from 'valibot';

export const ghost = new GhostContentAPI({
  url: 'https://ghost.sharath.uk',
  key: 'f2126d70e34ae73b4c0b0ea013',
  version: 'v5.0',
  async makeRequest(options) {
    const url = new URL(options.url);
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.set(key, value as string);
    });

    const headers = new Headers();
    Object.entries(options.headers).forEach(([key, value]) => {
      headers.set(key, value as string);
    });

    const res = await fetch(url.toString(), {
      method: options.method,
      headers,
    });
    const data = await res.json();
    return { data };
  },
});

export const GhostLatestPostsQuerySchema = v.object({
  limit: v.optional(v.pipe(v.number(), v.minValue(1), v.maxValue(10)), 3),
});

export const GhostLatestPosts: Handler<HonoEnv> = async (c) => {
  const { limit } = v.parse(GhostLatestPostsQuerySchema, { limit: parseInt(c.req.query('limit') ?? '3') });
  console.log(Object.keys(ghost).toString());
  const posts = await cache(`ghost-latest-posts-${limit.toString()}`)(() =>
    ghost.posts.browse({ limit, order: 'published_at DESC', include: 'authors' }),
  );
  return c.json(posts);
};
