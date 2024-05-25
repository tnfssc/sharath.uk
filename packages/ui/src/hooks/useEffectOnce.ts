import { useEffect, useRef } from 'react';

export const useEffectOnce = (fn: () => void | Promise<void>) => {
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    void fn();
  }, [fn]);
};
