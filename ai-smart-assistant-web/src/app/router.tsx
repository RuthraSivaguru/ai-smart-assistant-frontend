import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { Protected } from "../components/protectedRoute";
import { ConfirmDialog } from "primereact/confirmdialog";
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import Dashboard from "../features/dashboard/pages/dashboard";
import { MaintenancePage } from "../common/pages/Maintenance";
import { redirect } from "@tanstack/react-router";
import styles from "../styles/app/App.module.css";

import { LoadingOverlay } from "../components/LoadingOverlay";

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <LoadingOverlay />
      <ConfirmDialog />
      <Outlet />
    </>
  ),
  notFoundComponent: () => (
    <div className={styles.notFoundContainer}>Page Not Found</div>
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

import DashboardLayout from "../common/components/DashboardLayout";

// Protected Layout Route
const protectedLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: () => (
    <Protected>
      <DashboardLayout />
    </Protected>
  ),
});

import TasksPage from "../features/tasks/pages/tasks";
import CalendarPage from "../features/calendar/pages/calendar";
import SettingsPage from "../features/settings/pages/settings";

const dashboardRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/dashboard",
  component: Dashboard,
});

const tasksRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/tasks",
  component: TasksPage,
});

const calendarRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/calendar",
  component: CalendarPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/settings",
  component: SettingsPage,
});

protectedLayoutRoute.addChildren([
  dashboardRoute,
  tasksRoute,
  calendarRoute,
  settingsRoute,
]);

const maintenanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/maintenance",
  component: MaintenancePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  protectedLayoutRoute,
  maintenanceRoute,
]);

export const router = createRouter({
  routeTree,
});
