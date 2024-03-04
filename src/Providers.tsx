import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AnimatePresence>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </AnimatePresence>
    </ThemeProvider>
  );
}
