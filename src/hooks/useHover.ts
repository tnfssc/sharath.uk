import { useEffect, useState } from 'react';

export const useHover = (ref: React.RefObject<HTMLElement>) => {
  const [isHovered, setHovered] = useState(false);
  const enter = () => {
    setHovered(true);
  };
  const leave = () => {
    setHovered(false);
  };

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', enter);
      node.addEventListener('mouseleave', leave);
      return () => {
        node.removeEventListener('mouseenter', enter);
        node.removeEventListener('mouseleave', leave);
      };
    }
  }, [ref]);

  return isHovered;
};
