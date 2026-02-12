import { useMemo, useState } from "react";
import { useTasks } from "../../tasks/hooks/useTask";
import { Button } from "primereact/button";
import { motion, type Variants } from "framer-motion";
import { AiTaskDialog } from "../../tasks/components/AiTaskDialog";
import styles from "../../../styles/features/dashboard/Dashboard.module.css";

export default function Dashboard() {
  const { tasks, loadTasks } = useTasks();
  const [showAiDialog, setShowAiDialog] = useState(false);

  const stats = useMemo(() => {
    const total = tasks?.length || 0;
    const completed =
      tasks?.filter((t) => t.status === "completed")?.length || 0;
    const pending = tasks?.filter((t) => t.status === "pending")?.length || 0;
    const inProgress =
      tasks?.filter((t) => t.status === "in_progress")?.length || 0;
    return { total, completed, pending, inProgress };
  }, [tasks]);

  const containerAnimations: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemAnimations: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    hover: {
      y: -5,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  return (
    <motion.div
      variants={containerAnimations}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-column md:flex-row md:align-items-center justify-content-between gap-4 mb-4">
        <div>
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`text-4xl font-bold text-900 m-0 tracking-tight ${styles.headerGradient}`}
          >
            Welcome back!
          </motion.h1>
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-600 mt-2 font-medium"
          >
            Here's what's happening with your projects today.
          </motion.p>
        </div>

        <div className="flex gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              label="Generate New Task"
              icon="pi pi-sparkles"
              className={`p-button-raised transition-all transition-duration-200 px-4 py-2 font-bold ${styles.newTaskButton}`}
              onClick={() => setShowAiDialog(true)}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              label="Generate Report"
              icon="pi pi-file-export"
              className="p-button-outlined p-button-secondary border-round-xl px-4 py-2 font-bold transition-all"
            />
          </motion.div>
        </div>
      </div>

      <AiTaskDialog
        visible={showAiDialog}
        onHide={() => setShowAiDialog(false)}
        onSuccess={() => loadTasks()}
      />

      {/* Stats Grid */}
      <div className="grid">
        {[
          {
            title: "All Tasks",
            value: stats.total,
            icon: "pi-folder-open",
            color: "indigo",
            trend: "+12% from last week",
          },
          {
            title: "Completed",
            value: stats.completed,
            icon: "pi-check-circle",
            color: "teal",
            trend: "+5% from last week",
          },
          {
            title: "Pending",
            value: stats.pending,
            icon: "pi-hourglass",
            color: "rose",
            trend: "-2% from last week",
          },
          {
            title: "Active",
            value: stats.inProgress,
            icon: "pi-bolt",
            color: "amber",
            trend: "On track",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={itemAnimations}
            whileHover="hover"
            className="col-12 md:col-6 lg:col-3"
          >
            <div
              className={`surface-card p-4 border-round-2xl shadow-1 h-full flex flex-column transition-all duration-300 hover:shadow-4 cursor-pointer relative overflow-hidden group ${styles.statsCard}`}
            >
              <div className="flex justify-content-between align-items-start mb-3">
                <div className="flex flex-column">
                  <span className="text-500 font-bold mb-1 uppercase text-xs tracking-widest">
                    {item.title}
                  </span>
                  <span className="text-900 font-black text-4xl">
                    {item.value}
                  </span>
                </div>
                <div
                  className={`flex align-items-center justify-content-center bg-${item.color}-50 border-round-xl p-3 shadow-sm group-hover:scale-110 transition-transform ${styles.statsIconContainer}`}
                >
                  <i
                    className={`pi ${item.icon} text-${item.color}-600 text-2xl`}
                  />
                </div>
              </div>
              <div className="flex align-items-center gap-2 mt-auto">
                <span className="text-green-500 text-xs font-bold">
                  {item.trend}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
