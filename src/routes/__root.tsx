import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import MainLayout from "../shared/layouts/MainLayout";

export const Route = createRootRoute({
  component: () => (
    <MainLayout>
      <Outlet />
      <TanStackRouterDevtools />
    </MainLayout>
  ),
});
