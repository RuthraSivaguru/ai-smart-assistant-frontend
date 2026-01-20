import { motion } from "framer-motion";
import { Card } from "primereact/card";

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
      className="flex align-items-center justify-content-center min-h-screen w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div
        className="absolute w-full h-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 50%)",
          pointerEvents: "none",
        }}
      />

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
          className={`w-full md:w-30rem border-none ${className}`}
          style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            borderRadius: "24px",
          }}
        >
          {children}
        </Card>
      </motion.div>
    </div>
  );
};
