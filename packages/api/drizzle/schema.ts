import { init } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const createId = init({ length: 5 });

export const linkShortenerTable = sqliteTable('urls', {
  id: text('id')
    .unique()
    .primaryKey()
    .$defaultFn(() => createId()),
  url: text('url').notNull(),
  createdBy: text('createdBy').notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});
