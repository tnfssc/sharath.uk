import { Outlet, createRootRoute } from '@tanstack/react-router';

import { TanStackRouterDevtools } from '@/components/__DEV__/TanStackRouterDevtools';
import NavBar from '@/components/navbar';

export const Route = createRootRoute({
  component: () => (
    <div className="w-screen flex flex-col items-center">
      <div className="relative max-w-[1280px] container">
        <NavBar />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </div>
  ),
});
