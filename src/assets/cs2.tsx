import logo from '@/assets/cs2.svg';
import lightLogo from '@/assets/cs2light.svg';
import { useTheme } from '@/hooks/useTheme';

export const useCS2Logo = () => {
  const { theme } = useTheme();
  return theme === 'dark' ? logo : lightLogo;
};
