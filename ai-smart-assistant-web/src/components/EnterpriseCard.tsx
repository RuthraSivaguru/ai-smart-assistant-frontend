import { motion, type Variants } from "framer-motion";
import { Card } from "primereact/card";
import styles from "../styles/components/EnterpriseCard.module.css";

interface EnterpriseCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const EnterpriseCard = ({
  title,
  subtitle,
  children,
  footer,
  className = "",
}: EnterpriseCardProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div
      className={`flex align-items-center justify-content-center min-h-screen w-full overflow-hidden relative ${styles.container}`}
    >
      <div className={`absolute w-full h-full ${styles.backgroundOverlay}`} />
      <div className={styles.shape + " " + styles.shape1} />
      <div className={styles.shape + " " + styles.shape2} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-1 px-3 w-full flex justify-content-center"
      >
        <motion.div variants={itemVariants} className="w-full md:w-30rem">
          <Card
            title={
              <motion.div variants={itemVariants} className="text-center mb-4">
                <span className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent block mb-2">
                  {title}
                </span>
                {subtitle && (
                  <span className="text-gray-500 font-medium text-lg block">
                    {subtitle}
                  </span>
                )}
              </motion.div>
            }
            footer={
              footer && (
                <motion.div variants={itemVariants} className="mt-4">
                  {footer}
                </motion.div>
              )
            }
            className={`border-none ${className} ${styles.card}`}
          >
            <motion.div variants={itemVariants}>{children}</motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
