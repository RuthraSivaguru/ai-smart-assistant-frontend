import { create } from "zustand";

interface UiState {
  isSidebarCollapsed: boolean;
  mobileSidebarVisible: boolean;
  maintenanceLoading: boolean;

  // Setters
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileSidebarVisible: (visible: boolean) => void;
  setMaintenanceLoading: (loading: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isSidebarCollapsed: false,
  mobileSidebarVisible: false,
  maintenanceLoading: false,

  setSidebarCollapsed: (isSidebarCollapsed) => set({ isSidebarCollapsed }),
  setMobileSidebarVisible: (mobileSidebarVisible) =>
    set({ mobileSidebarVisible }),
  setMaintenanceLoading: (maintenanceLoading) => set({ maintenanceLoading }),
}));
