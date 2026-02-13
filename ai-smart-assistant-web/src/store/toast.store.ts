import { create } from "zustand";

// Store is now empty as logic moved to useToast hook
// Keeping it if we need global toast state later, otherwise could be deleted
interface ToastState {}

export const useToastStore = create<ToastState>(() => ({}));
