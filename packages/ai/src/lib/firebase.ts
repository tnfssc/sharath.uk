import { verifyIdToken as googleVerifyIdToken } from 'web-auth-library/google';
import { z } from 'zod';

import type { Env } from '@/env';

const firebaseAdminConfigSchema = z.object({
  type: z.literal('service_account'),
  project_id: z.string(),
  private_key_id: z.string(),
  private_key: z.string(),
  client_email: z.string().email(),
  client_id: z.string(),
  auth_uri: z.string().url(),
  token_uri: z.string().url(),
  auth_provider_x509_cert_url: z.string().url(),
  client_x509_cert_url: z.string().url(),
  universe_domain: z.string(),
});

export const getFirebaseAdminConfig = (env: Env) =>
  firebaseAdminConfigSchema.parse(JSON.parse(env.FIREBASE_SERVICE_ACCOUNT_KEY));

export const verifyIdToken = async (env: Env, idToken: string) => {
  const firebaseAdminConfig = getFirebaseAdminConfig(env);

  return await googleVerifyIdToken({
    idToken,
    projectId: firebaseAdminConfig.project_id,
    env: {
      GOOGLE_CLOUD_CREDENTIALS: JSON.stringify(firebaseAdminConfig),
    },
  });
};
