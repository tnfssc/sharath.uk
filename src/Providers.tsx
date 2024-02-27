import { ThemeProvider } from '@/components/theme-provider';

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
}
