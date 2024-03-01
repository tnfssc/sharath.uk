import { Suspense, lazy } from 'react';

const DevTools =
  import.meta.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const TanStackRouterDevtools = () => (
  <Suspense fallback={null}>
    <DevTools />
  </Suspense>
);
