import { Outlet, createRootRoute } from '@tanstack/react-router';
import { posthog } from 'posthog-js';

import { TanStackRouterDevtools } from '@/components/dev/TanStackRouterDevtools';
import NavBar from '@/components/navbar';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { Meteors } from '@/components/ui/meteors';
import { Toaster } from '@/components/ui/sonner';
import { useSettings } from '@/hooks/useSettings';
import { hono } from '@/lib/hono';

export const Route = createRootRoute({
  component: __Root,
  onEnter() {
    posthog.capture('$pageview');
  },
});

function __Root() {
  const { meteors } = useSettings();

  const spyUrl = hono['view-count'].increment.$url();
  spyUrl.searchParams.set('name', 'sharath.uk');

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="relative w-full flex flex-col items-center">
        <NavBar />
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden rounded-md antialiased">
          <BackgroundGradientAnimation>
            <div className="absolute z-1 max-h-screen overflow-hidden">
              <div className="h-screen w-screen flex flex-col items-center justify-center">
                <div className="max-h-screen overflow-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          </BackgroundGradientAnimation>
          {meteors && <Meteors number={20} />}
        </div>
        <Toaster position="top-right" />
        <TanStackRouterDevtools />
        <img alt="view-count-spy" src={spyUrl.toString()} className="hidden" />
      </div>
    </div>
  );
}
