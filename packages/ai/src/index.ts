import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { stream } from 'hono/streaming';

import { isAuthorized } from './lib/isAuthorized';
import type { Runner } from './types';

export interface Env {
  AI: { run: Runner };
  FIREBASE_SERVICE_ACCOUNT_KEY: string;
}

const hono = new Hono()
  .use(cors())
  .options((c) => c.text('ok'))
  .get('/', async (c) => {
    // @ts-expect-error - this shows a problem with the type system
    const env: Env = c.env;

    const idToken = c.req.header('Authorization')?.split('Bearer ')[1];
    const authorized = await isAuthorized(idToken, env);
    if (!authorized) {
      return c.text('Unauthorized', 401);
    }

    const {
      data: [fact],
    }: { data: [string] } = await fetch('https://meowfacts.herokuapp.com/')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res;
      })
      .then((res) => res.json<{ data: [string] }>())
      .catch(() => ({ data: ['Cats have over 20 muscles that control their ears.'] }));

    const res = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        {
          role: 'system',
          content: 'You are the 16 century writer, Shakespeare.',
        },
        {
          role: 'user',
          content: `Respond with only the converted text and don't include any other text. Use maximum of 50 words in total.\nConvert this fact into a Shakespeare writing.\nFact: ${fact}`,
        },
      ],
      max_tokens: 200,
      stream: true,
    });

    c.header('Content-Encoding', 'none');
    return stream(c, (stream) => stream.pipe(res));
  });

export default hono;
