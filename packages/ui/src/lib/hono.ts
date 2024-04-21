import type { HonoType } from '@sharath.uk/ai/src';
import { hc } from 'hono/client';

import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/auth';

if (!import.meta.env.VITE_AI_ENDPOINT) throw new Error('AI endpoint not set');

export let hono = hc<HonoType>(import.meta.env.VITE_AI_ENDPOINT as string, {
  headers: async () => {
    return {
      Authorization: `Bearer ${(await useAuthStore.getState().user?.getIdToken()) ?? ''}`,
    };
  },
});

auth.onAuthStateChanged((user) => {
  hono = hc<HonoType>(import.meta.env.VITE_AI_ENDPOINT as string, {
    headers: async () => {
      return {
        Authorization: `Bearer ${(await user?.getIdToken()) ?? ''}`,
      };
    },
  });
});
