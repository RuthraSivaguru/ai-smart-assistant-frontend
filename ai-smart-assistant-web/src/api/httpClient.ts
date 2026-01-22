import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000",
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const { useToastStore } = await import("../store/toast.store");
    const { router } = await import("../app/router");

    if (!error.response || error.code === "ERR_NETWORK") {
      router.navigate({ to: "/maintenance" });
      return Promise.reject(error);
    }

    if (error.response?.status >= 500) {
      useToastStore.getState().showToast({
        severity: "error",
        summary: "Server Error",
        detail: "Something went wrong on the server. Please try again later.",
      });
    } else {
      useToastStore.getState().showToast({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || "An unexpected error occurred",
      });
    }

    return Promise.reject(error);
  },
);
