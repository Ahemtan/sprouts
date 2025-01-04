import { ThemeProvider } from '@/components/theme-provider'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import Header from '@/components/Header'

export const Route = createRootRoute({
  component: () => (
    <>

      <ThemeProvider>

        <Header />

        <main>
          <Outlet />
        </main>
      
      </ThemeProvider>

      <TanStackRouterDevtools />
    </>
  ),
})