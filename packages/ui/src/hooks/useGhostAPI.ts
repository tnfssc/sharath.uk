import type { GhostAPI } from '@tryghost/content-api';
import { useState } from 'react';

import { useEffectOnce } from '@/hooks/useEffectOnce';
import { ghost } from '@/lib/ghost';

export type Param<T> = (ghost: GhostAPI) => Promise<T>;

export const useGhostAPI = <T>(fn: Param<T>) => {
  const [data, setData] = useState<T | undefined | null>(undefined);
  useEffectOnce(() => {
    fn(ghost)
      .then(setData)
      .catch(() => {
        setData(null);
      });
  });
  return data;
};
