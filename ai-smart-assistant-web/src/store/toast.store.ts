import { create } from "zustand";

export interface ToastMessage {
  severity: "success" | "info" | "warn" | "error";
  summary: string;
  detail?: string;
  life?: number;
}

interface ToastState {
  toast: ToastMessage | null;
  showToast: (message: ToastMessage) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toast: null,
  showToast: (message) => set({ toast: message }),
}));
