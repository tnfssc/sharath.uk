import logo from '@/assets/react.svg';
import lightLogo from '@/assets/reactlight.svg';
import { useTheme } from '@/hooks/useTheme';

export const useReactLogo = () => {
  const { theme } = useTheme();
  return theme === 'dark' ? logo : lightLogo;
};
