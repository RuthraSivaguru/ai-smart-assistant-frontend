import { toast } from "react-hot-toast";

export interface ToastMessage {
  severity: "success" | "info" | "warn" | "error";
  summary: string;
  detail?: string;
  life?: number;
}

export const useToast = () => {
  const showToast = (message: ToastMessage) => {
    const options = {
      duration: message.life || 3000,
    };

    switch (message.severity) {
      case "success":
        toast.success(message.detail || message.summary, options);
        break;
      case "error":
        toast.error(message.detail || message.summary, options);
        break;
      case "warn":
        toast.error(message.detail || message.summary, {
          ...options,
          icon: "⚠️",
        });
        break;
      case "info":
        toast(message.detail || message.summary, {
          ...options,
          icon: "ℹ️",
        });
        break;
      default:
        toast(message.detail || message.summary, options);
    }
  };

  return { showToast };
};
