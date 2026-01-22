import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useState } from "react";
import { useToastStore } from "../../store/toast.store";
import { useRouter } from "@tanstack/react-router";

export const MaintenancePage = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastStore();
  const router = useRouter();

  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Try to reach the backend
      await fetch("http://localhost:3000");
      // If successful (or at least reachable), go back
      window.history.back();
      // Fallback if history back doesn't work or user refreshed on maintenance page
      setTimeout(() => {
        router.navigate({ to: "/" });
      }, 100);
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Connection Failed",
        detail: "Backend is still unreachable. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen surface-ground">
      <Card className="w-full md:w-6 lg:w-4 text-center p-4">
        <i className="pi pi-exclamation-triangle text-6xl text-orange-500 mb-4"></i>
        <h1 className="text-900 text-3xl font-medium mb-3">
          Under Maintenance
        </h1>
        <p className="text-600 line-height-3 mb-4">
          We are currently experiencing some issues or performing scheduled
          maintenance. Please try again later.
        </p>
        <Button
          label="Refresh Page"
          icon="pi pi-refresh"
          loading={loading}
          onClick={handleRefresh}
        />
      </Card>
    </div>
  );
};
