import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import Header from "@/components/Header";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header />
            <main className="px-2">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>

      <TanStackRouterDevtools />
    </>
  ),
});
