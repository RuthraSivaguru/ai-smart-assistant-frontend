import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useToastStore } from "../../store/toast.store";

export const GlobalToast = () => {
  const toast = useRef<Toast>(null);
  const { toast: message } = useToastStore();

  useEffect(() => {
    if (message && toast.current) {
      toast.current.show(message);
    }
  }, [message]);

  return <Toast ref={toast} />;
};
