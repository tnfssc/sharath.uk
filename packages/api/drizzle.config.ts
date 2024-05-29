import { envSchema } from 'api/env';
import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';
import * as v from 'valibot';

dotenv.config({ path: '.dev.vars' });

const env = v.parse(envSchema, process.env);

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  driver: 'turso',
  dialect: 'sqlite',
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
