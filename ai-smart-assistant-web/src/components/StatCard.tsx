import { motion } from "framer-motion";
import { Card } from "primereact/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendUp = true,
  color = "blue",
}: StatCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card
        className="h-full surface-card shadow-2 border-round-xl cursor-pointer overflow-hidden"
        style={{ borderRadius: "1.5rem" }}
      >
        <div className="flex justify-content-between mb-3">
          <div>
            <span className="block text-500 font-medium mb-3">{title}</span>
            <div className="text-900 font-bold text-3xl">{value}</div>
          </div>
          <div
            className={`flex align-items-center justify-content-center bg-${color}-100 border-round`}
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
            <i className={`pi ${icon} text-${color}-500 text-xl`}></i>
          </div>
        </div>
        {trend && (
          <span className={`text-${trendUp ? "green" : "red"}-500 font-medium`}>
            {trendUp ? "+" : ""}
            {trend}
          </span>
        )}
        {trend && <span className="text-500"> since last visit</span>}
      </Card>
    </motion.div>
  );
};
