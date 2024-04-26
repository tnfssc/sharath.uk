import { auth } from 'ai/middleware/auth';
import { AIPoem } from 'ai/routes/aipoem';
import { PoemThumbnail } from 'ai/routes/poemthumbnail';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const hono = new Hono()
  .use(cors())
  .use(auth)
  .options((c) => c.text('OK'))
  .get('/aipoem', AIPoem)
  .get('/poemthumbnail', PoemThumbnail);

export type HonoType = typeof hono;

export default hono;
