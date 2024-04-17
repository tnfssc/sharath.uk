import { useEffect, useState } from 'react';

export const useFocus = (ref: React.RefObject<HTMLElement>) => {
  const [isFocused, setFocused] = useState(false);
  const focus = () => {
    setFocused(true);
  };
  const blur = () => {
    setFocused(false);
  };

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('focus', focus);
      node.addEventListener('blur', blur);
      return () => {
        node.removeEventListener('focus', focus);
        node.removeEventListener('blur', blur);
      };
    }
  }, [ref]);

  return isFocused;
};
