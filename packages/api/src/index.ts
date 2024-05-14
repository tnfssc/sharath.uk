import { auth } from 'api/middleware/auth';
import { AIPoem } from 'api/routes/aipoem';
import { PoemThumbnail } from 'api/routes/poemthumbnail';
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
