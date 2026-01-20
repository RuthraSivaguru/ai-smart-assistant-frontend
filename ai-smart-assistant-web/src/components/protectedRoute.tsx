import { Navigate } from "@tanstack/react-router";
import { useAuthStore } from "../store/auth.store";

export function Protected({ children }: { children: React.ReactNode }) {
  const isAuth = useAuthStore((s) => s.isAuthenticated);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}
