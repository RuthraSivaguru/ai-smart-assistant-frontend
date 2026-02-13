import { create } from "zustand";

interface CalendarState {
  currentDate: Date;
  viewType: "grid" | "list";

  // Actions
  setCurrentDate: (date: Date) => void;
  setViewType: (view: "grid" | "list") => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  currentDate: new Date(),
  viewType: "list",

  setCurrentDate: (currentDate) => set({ currentDate }),
  setViewType: (viewType) => set({ viewType }),
}));
