import { motion } from "framer-motion";
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
  return (
    <div
      className={`flex align-items-center justify-content-center min-h-screen w-full overflow-hidden ${styles.container}`}
    >
      <div className={`absolute w-full h-full ${styles.backgroundOverlay}`} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          type: "spring",
          stiffness: 100,
        }}
        className="z-1 px-3"
      >
        <Card
          title={
            <div className="text-center mb-2">
              <span className="text-3xl font-bold text-gray-900">{title}</span>
            </div>
          }
          subTitle={
            <div className="text-center text-gray-500 mb-4">{subtitle}</div>
          }
          footer={footer}
          className={`w-full md:w-30rem border-none ${className} ${styles.card}`}
        >
          {children}
        </Card>
      </motion.div>
    </div>
  );
};
