import type { Env } from '..';
import { verifyIdToken } from '../lib/firebase';

export const isAuthorized = async (idToken: string | undefined, env: Env) => {
  if (!idToken) return false;

  const decodedToken = await verifyIdToken(idToken, env).catch(() => null);

  if (decodedToken?.email_verified === false) {
    return false;
  }

  return true;
};
