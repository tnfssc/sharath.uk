import logo from '@/assets/medium.svg';
import lightLogo from '@/assets/mediumlight.svg';
import { useTheme } from '@/hooks/useTheme';

export const useMediumLogo = () => {
  const { theme } = useTheme();
  return theme === 'dark' ? logo : lightLogo;
};
