import type { HonoEnv } from 'api/env';
import { ImageGeneration } from 'api/lib/ai';
import type { Handler } from 'hono';

export const PoemThumbnail: Handler<HonoEnv> = async (c) => {
  const {
    data: [fact],
  }: { data: [string] } = await fetch('https://meowfacts.herokuapp.com/')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res;
    })
    .then((res) => res.json<{ data: [string] }>())
    .catch(() => ({ data: ['Cats have over 20 muscles that control their ears.'] }));

  const res = await ImageGeneration.run(c.env, '@cf/lykon/dreamshaper-8-lcm', {
    prompt: `Depict this fact as an image.\nFact: ${fact}`,
  });

  c.header('Content-Type', 'image/png');
  return c.body(res);
};
