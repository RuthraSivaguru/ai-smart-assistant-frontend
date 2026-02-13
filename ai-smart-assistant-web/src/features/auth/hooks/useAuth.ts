import { useAuthStore } from "../../../store/auth.store";
import { loginApi, registerApi } from "../api/auth.api";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const useAuth = () => {
  const navigate = useNavigate();
  const {
    login: storeLogin,
    logout: storeLogout,
    setLoginLoading,
    setRegisterLoading,
    loginForm,
    registerForm,
    resetForms,
  } = useAuthStore();

  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      const response = await loginApi(loginForm);
      storeLogin(response.access_token);
      toast.success("Welcome back!");
      await navigate({ to: "/dashboard" });
      resetForms();
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async () => {
    setRegisterLoading(true);
    try {
      await registerApi(registerForm);
      toast.success("Account created successfully! Please login.");
      await navigate({ to: "/login" });
      resetForms();
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLogout = async () => {
    storeLogout();
    toast.success("Logged out successfully");
    await navigate({ to: "/login" });
  };

  return {
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
