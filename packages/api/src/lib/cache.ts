import DB, { cacheTable } from 'api/lib/db';
import { eq } from 'drizzle-orm';

export const cache =
  (key: string, ttl = 24 * 60 * 60 * 1000) =>
  async <T>(dataFactory: () => Promise<T>): Promise<T> => {
    const cache = await DB.db.select().from(cacheTable).where(eq(cacheTable.key, key));
    if (cache.length > 0) {
      const { value, expiry } = cache[0];
      if (expiry > new Date()) return value as T;
      else await DB.db.delete(cacheTable).where(eq(cacheTable.key, key));
    }

    const value = await dataFactory();
    await DB.db.insert(cacheTable).values({ key, value, expiry: new Date(Date.now() + ttl) });
    return value as T;
  };
