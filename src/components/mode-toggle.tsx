import { Moon, Sun } from 'lucide-react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export interface ModeToggleProps extends Omit<ButtonProps, 'children'> {
  defaultTheme?: 'dark' | 'light';
}

export function ModeToggle(props: ModeToggleProps) {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button asChild variant="ghost" onClick={handleToggle} {...props}>
          <div>
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
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Switch theme</TooltipContent>
    </Tooltip>
  );
}
