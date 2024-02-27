import { useContext } from 'react';

import { ThemeProviderContext } from '@/components/theme-provider';

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  return context;
};
