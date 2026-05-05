import { createRouter, createRoute, createRootRoute, Outlet } from "@tanstack/react-router";
import { CatalogPage } from "@/pages/catalog";
import { ProductPage } from "@/pages/product";
import { Header } from "@/components/Header";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Outlet  />
      </main>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CatalogPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/produtos/$id",
  component: ProductPage,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, productRoute]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
