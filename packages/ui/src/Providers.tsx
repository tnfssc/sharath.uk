import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { posthog } from 'posthog-js';
import { toast } from 'sonner';

import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { env } from '@/env';

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
      onError(error, variables, context) {
        console.error({ variables, context });
        console.error(error);
        toast.error(error.message);
      },
    },
  },
});

if (env.PROD) posthog.init(env.VITE_POSTHOG_TOKEN, { api_host: env.VITE_POSTHOG_API_HOST });

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
