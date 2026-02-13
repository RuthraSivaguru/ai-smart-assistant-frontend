import { create } from "zustand";
import type { ProfileResponse } from "../features/settings/types/settings.types";

interface SettingsState {
  user: ProfileResponse | null;
  loading: boolean;
  deleteLoading: boolean;

  // Setters
  setUser: (user: ProfileResponse | null) => void;
  setLoading: (loading: boolean) => void;
  setDeleteLoading: (loading: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  user: null,
  loading: true,
  deleteLoading: false,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setDeleteLoading: (deleteLoading) => set({ deleteLoading }),
}));
