import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchInterval: false,
      retryOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AnimatePresence>
          <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
        </AnimatePresence>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
