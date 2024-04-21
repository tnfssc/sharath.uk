import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { auth } from '@/middleware/auth';
import { AIPoem } from '@/routes/aipoem';
import { PoemThumbnail } from '@/routes/poemthumbnail';

const hono = new Hono()
  .use(cors())
  .use(auth)
  .options((c) => c.text('OK'))
  .get('/aipoem', AIPoem)
  .get('/poemthumbnail', PoemThumbnail);

export type HonoType = typeof hono;

export default hono;
