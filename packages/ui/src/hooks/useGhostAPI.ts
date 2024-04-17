import type { GhostAPI } from '@tryghost/content-api';
import { useState } from 'react';

import { onMount } from '@/hooks/onMount';
import { ghost } from '@/lib/ghost';

export type Param<T> = (ghost: GhostAPI) => Promise<T>;

export const useGhostAPI = <T>(fn: Param<T>) => {
  const [data, setData] = useState<T | undefined | null>(undefined);
  onMount(() => {
    fn(ghost)
      .then(setData)
      .catch(() => {
        setData(null);
      });
  });
  return data;
};
