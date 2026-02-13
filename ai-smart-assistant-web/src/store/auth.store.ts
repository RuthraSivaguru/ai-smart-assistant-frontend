import { create } from "zustand";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;

  // Login Form
  loginForm: { email: string; password: string };
  loginLoading: boolean;

  // Register Form
  registerForm: {
    name: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
  };
  registerLoading: boolean;

  // State Mutators
  login: (token: string) => void;
  logout: () => void;
  setIsAuthenticating: (loading: boolean) => void;

  setLoginForm: (form: Partial<AuthState["loginForm"]>) => void;
  setLoginLoading: (loading: boolean) => void;
  setRegisterForm: (form: Partial<AuthState["registerForm"]>) => void;
  setRegisterLoading: (loading: boolean) => void;
  resetForms: () => void;
}

const initialRegisterForm = {
  name: "",
  email: "",
  password: "",
  address: "",
  phoneNumber: "",
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isAuthenticating: false,

  loginForm: { email: "", password: "" },
  loginLoading: false,

  registerForm: initialRegisterForm,
  registerLoading: false,

  login: (token) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true, isAuthenticating: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, isAuthenticated: false, isAuthenticating: false });
  },

  setIsAuthenticating: (loading) => set({ isAuthenticating: loading }),

  setLoginForm: (form) =>
    set((state) => ({ loginForm: { ...state.loginForm, ...form } })),
  setLoginLoading: (loginLoading) => set({ loginLoading }),

  setRegisterForm: (form) =>
    set((state) => ({ registerForm: { ...state.registerForm, ...form } })),
  setRegisterLoading: (registerLoading) => set({ registerLoading }),

  resetForms: () =>
    set({
      loginForm: { email: "", password: "" },
      registerForm: initialRegisterForm,
    }),
}));
