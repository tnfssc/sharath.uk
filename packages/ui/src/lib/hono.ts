import type { HonoType } from '@sharath.uk/api/src';
import { hc } from 'hono/client';

import { env } from '@/env';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/auth';

export let hono = hc<HonoType>(env.VITE_API_ENDPOINT, {
  headers: async () => {
    return {
      Authorization: `Bearer ${(await useAuthStore.getState().user?.getIdToken()) ?? ''}`,
    };
  },
});

auth.onAuthStateChanged((user) => {
  hono = hc<HonoType>(env.VITE_API_ENDPOINT, {
    headers: async () => {
      return {
        Authorization: `Bearer ${(await user?.getIdToken()) ?? ''}`,
      };
    },
  });
});
