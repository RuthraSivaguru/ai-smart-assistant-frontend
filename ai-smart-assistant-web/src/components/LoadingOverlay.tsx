import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "../store/auth.store";
import { ThunderLoader } from "./ThunderLoader";
import styles from "../styles/common/LoadingOverlay.module.css";

export const LoadingOverlay = () => {
  const isAuthenticating = useAuthStore((s) => s.isAuthenticating);

  return (
    <AnimatePresence>
      {isAuthenticating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-1000 flex align-items-center justify-content-center ${styles.overlay}`}
        >
          <ThunderLoader />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
