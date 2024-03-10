import { useEffect } from 'react';
import { useSelect } from 'react-cosmos/client';

import { useTheme } from '@/hooks/useTheme';

export const useSelectTheme = () => {
  const { theme, setTheme } = useTheme();
  const [selectedTheme] = useSelect<typeof theme>('Theme', { options: ['dark', 'light'], defaultValue: theme });
  useEffect(() => {
    if (selectedTheme !== theme) {
      setTheme(selectedTheme);
    }
  }, [selectedTheme, setTheme, theme]);
};
