import { createRouter, createRoute, createRootRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/pages/catalog";

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CatalogPage,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute]),
});