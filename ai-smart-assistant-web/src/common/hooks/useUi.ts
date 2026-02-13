import { useUiStore } from "../../store/ui.store";

export const useUi = () => {
  const {
    isSidebarCollapsed,
    setSidebarCollapsed,
    setMobileSidebarVisible,
    setMaintenanceLoading,
  } = useUiStore();

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return {
    isSidebarCollapsed,
    toggleSidebar,
    setSidebarCollapsed,
    setMobileSidebarVisible,
    setMaintenanceLoading,
  };
};
