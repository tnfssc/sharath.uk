import { z } from 'zod';

export const envSchema = z.object({
  FIREBASE_SERVICE_ACCOUNT_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
