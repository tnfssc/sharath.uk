import { TextGeneration } from 'ai/lib/ai';
import type { Handler } from 'hono';
import { stream } from 'hono/streaming';

export const AIPoem: Handler = async (c) => {
  const {
    data: [fact],
  }: { data: [string] } = await fetch('https://meowfacts.herokuapp.com/')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res;
    })
    .then((res) => res.json<{ data: [string] }>())
    .catch(() => ({ data: ['Cats have over 20 muscles that control their ears.'] }));

  const res = await TextGeneration.run(c.env, '@cf/meta/llama-3-8b-instruct', {
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
};
