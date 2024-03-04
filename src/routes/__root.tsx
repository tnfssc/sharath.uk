import { Outlet, createRootRoute } from '@tanstack/react-router';

import { TanStackRouterDevtools } from '@/components/__DEV__/TanStackRouterDevtools';
import NavBar from '@/components/navbar';
import { Meteors } from '@/components/ui/meteors';

export const Route = createRootRoute({
  component: () => (
    <div className="w-screen flex flex-col items-center">
      <div className="relative w-full flex flex-col items-center">
        <NavBar />
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden rounded-md antialiased">
          <Outlet />
          <Meteors number={20} />
        </div>
        <TanStackRouterDevtools />
      </div>
    </div>
  ),
});
