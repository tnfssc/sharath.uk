import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  return (
    <Button size="sm" variant="ghost" onClick={handleToggle}>
      <Moon
        className={cn('h-[1.2rem] w-[1.2rem] animate-duration-500 animate-both', {
          'animate-in spin-in-100 fade-in': isDark,
          'animate-out spin-out-100 fade-out': isLight,
        })}
      />
      <Sun
        className={cn('absolute h-[1.2rem] w-[1.2rem] animate-duration-500 animate-both', {
          'animate-in -spin-in-100 fade-in': isLight,
          'animate-out -spin-out-100 fade-out': isDark,
        })}
      />
    </Button>
  );
}
