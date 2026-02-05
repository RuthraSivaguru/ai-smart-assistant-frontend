import { create } from "zustand";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login: (token: string) => void;
  logout: () => void;
  setIsAuthenticating: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isAuthenticating: false,

  login: (token) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true, isAuthenticating: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, isAuthenticated: false, isAuthenticating: false });
  },

  setIsAuthenticating: (loading) => set({ isAuthenticating: loading }),
}));
