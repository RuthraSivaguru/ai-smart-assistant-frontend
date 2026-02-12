import { motion } from "framer-motion";
import styles from "../styles/common/ThunderLoader.module.css";

export const ThunderLoader = () => {
  return (
    <div className="flex flex-column align-items-center justify-content-center gap-4">
      <div className="relative">
        {/* Glow Effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute top-50 left-50 -translate-x-50 -translate-y-50 w-8rem h-8rem border-circle ${styles.glowEffect}`}
        />

        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-7rem h-7rem border-2 border-circle border-primary-200 border-dashed opacity-40"
        />

        {/* Bolt Icon Container */}
        <div
          className={`absolute top-50 left-50 -translate-x-50 -translate-y-50 flex align-items-center justify-content-center ${styles.boltContainer}`}
        >
          <motion.div
            animate={{
              scale: [0.9, 1.1, 0.9],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`w-4rem h-4rem bg-primary border-round-xl flex align-items-center justify-content-center shadow-4 ${styles.boltIcon}`}
          >
            <i className="pi pi-bolt text-white text-4xl"></i>
          </motion.div>
        </div>
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-column align-items-center"
      >
        <span className="text-xl font-bold text-900 tracking-tight">
          NeuraTask
        </span>
        <div className="flex gap-1 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className={`w-4px h-4px border-circle bg-primary ${styles.loadingDot}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
