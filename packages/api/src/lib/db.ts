import { createClient } from '@libsql/client/web';
import type { Env } from 'api/env';
import { drizzle } from 'drizzle-orm/libsql';

export * from '../../drizzle/schema';

const getDb = (env: Env) => {
  return drizzle(
    createClient({
      url: env.TURSO_DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
    }),
  );
};

export default class DB {
  public static db: ReturnType<typeof getDb>;

  public constructor(env: Env) {
    if (DB.initialized) return;

    DB.db = getDb(env);

    DB.initialized = true;
  }

  private static initialized = false;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore
  private readonly _ = null;
}
