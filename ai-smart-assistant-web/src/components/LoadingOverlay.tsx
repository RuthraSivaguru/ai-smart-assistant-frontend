import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "../store/auth.store";
import { ThunderLoader } from "./ThunderLoader";

export const LoadingOverlay = () => {
  const isAuthenticating = useAuthStore((s) => s.isAuthenticating);

  return (
    <AnimatePresence>
      {isAuthenticating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-1000 flex align-items-center justify-content-center"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(8px)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          <ThunderLoader />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
