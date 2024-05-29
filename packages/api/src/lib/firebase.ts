import type { Env } from 'api/env';
import * as v from 'valibot';
import { verifyIdToken as googleVerifyIdToken } from 'web-auth-library/google';

const firebaseAdminConfigSchema = v.object({
  type: v.literal('service_account'),
  project_id: v.string(),
  private_key_id: v.string(),
  private_key: v.string(),
  client_email: v.pipe(v.string(), v.email()),
  client_id: v.string(),
  auth_uri: v.pipe(v.string(), v.url()),
  token_uri: v.pipe(v.string(), v.url()),
  auth_provider_x509_cert_url: v.pipe(v.string(), v.url()),
  client_x509_cert_url: v.pipe(v.string(), v.url()),
  universe_domain: v.string(),
});

export const getFirebaseAdminConfig = (env: Env) =>
  v.parse(firebaseAdminConfigSchema, JSON.parse(env.FIREBASE_SERVICE_ACCOUNT_KEY));

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
