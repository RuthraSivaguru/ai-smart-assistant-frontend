import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { Protected } from "../components/protectedRoute";
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import Dashboard from "../features/dashboard/pages/dashboard";
import { redirect } from "@tanstack/react-router";

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => (
    <div style={{ padding: "20px" }}>Page Not Found</div>
  ),
});

// Public routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({
      to: "/login",
    });
  },
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

// Protected route
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <Protected>
      <Dashboard />
    </Protected>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  dashboardRoute,
]);

export const router = createRouter({
  routeTree,
});
