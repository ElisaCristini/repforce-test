import { createRouter, createRoute, createRootRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/pages/catalog";
import { ProductPage } from "@/pages/product";

const rootRoute = createRootRoute();

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
  routeTree: rootRoute.addChildren([indexRoute]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}