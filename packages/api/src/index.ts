import { zValidator } from '@hono/zod-validator';
import { type HonoEnv, validateEnv } from 'api/env';
import { auth } from 'api/middleware/auth';
import { initialize } from 'api/middleware/initialize';
import { AIPoem } from 'api/routes/aipoem';
import { PoemThumbnail } from 'api/routes/poemthumbnail';
import { YoutubeSummarizer, YoutubeSummarizerQuerySchema } from 'api/routes/youtube-summarizer';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const hono = new Hono<HonoEnv>()
  .use(cors())
  .use(auth)
  .use(validateEnv)
  .use(initialize)
  .options((c) => c.text('OK'))
  .get('/aipoem', AIPoem)
  .get('/poemthumbnail', PoemThumbnail)
  .get('/youtube-summarizer', zValidator('query', YoutubeSummarizerQuerySchema), YoutubeSummarizer);

export type HonoType = typeof hono;

export default hono;
