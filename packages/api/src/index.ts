import { vValidator } from '@hono/valibot-validator';
import { type HonoEnv, validateEnv } from 'api/env';
import { auth } from 'api/middleware/auth';
import { closedAuth } from 'api/middleware/closed-auth';
import { initialize } from 'api/middleware/initialize';
import { AIPoem } from 'api/routes/aipoem';
import { GhostLatestPosts } from 'api/routes/ghost';
import { PoemThumbnail } from 'api/routes/poemthumbnail';
import {
  ShortenerCreate,
  ShortenerCreateQuerySchema,
  ShortenerExpand,
  ShortenerExpandQuerySchema,
} from 'api/routes/shortener';
import { UploadCdn, UploadCdnQuerySchema } from 'api/routes/upload-cdn';
import { YoutubeSummarizer, YoutubeSummarizerQuerySchema } from 'api/routes/youtube-summarizer';
import { Hono } from 'hono';
import { cache } from 'hono/cache';
import { cors } from 'hono/cors';

const hono = new Hono<HonoEnv>()
  .use(cors())
  .options((c) => c.text('OK'))
  .use(validateEnv)
  .use(initialize)
  .get('/shortener', vValidator('query', ShortenerExpandQuerySchema), ShortenerExpand)
  .use('/ghost/latest-posts', cache({ cacheName: 'ghost-latest-posts', cacheControl: 'max-age=86400' }))
  .get('/ghost/latest-posts', GhostLatestPosts)
  .use(auth)
  .get('/aipoem', AIPoem)
  .get('/poemthumbnail', PoemThumbnail)
  .get('/youtube-summarizer', vValidator('query', YoutubeSummarizerQuerySchema), YoutubeSummarizer)
  .post('/shortener', vValidator('query', ShortenerCreateQuerySchema), ShortenerCreate)
  .use(closedAuth)
  .put('/cdn', vValidator('query', UploadCdnQuerySchema), UploadCdn);

export type HonoType = typeof hono;

export default hono;
