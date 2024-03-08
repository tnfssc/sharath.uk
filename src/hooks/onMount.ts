/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from 'react';

export const onMount = (fn: () => void) => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) return;
    fn();
    isMounted.current = true;
  }, [fn]);
};
