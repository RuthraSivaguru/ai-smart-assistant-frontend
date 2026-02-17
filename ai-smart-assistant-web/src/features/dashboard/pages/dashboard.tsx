import { useMemo, useEffect } from "react";
import { useTaskStore } from "../../../store/task.store";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { motion, type Variants } from "framer-motion";
import { AiTaskDialog } from "../../tasks/components/AiTaskDialog";
import styles from "../../../styles/features/dashboard/Dashboard.module.css";
import { useTasks } from "../../tasks/hooks/useTasks";

export default function Dashboard() {
  const { tasks, loadTasks } = useTasks();
  const { showAiDialog, setShowAiDialog } = useTaskStore();

  useEffect(() => {
    loadTasks();
  }, []);

  const stats = useMemo(() => {
    const total = tasks?.length || 0;
    const completed =
      tasks?.filter((t) => t.status === "completed")?.length || 0;
    const pending = tasks?.filter((t) => t.status === "pending")?.length || 0;
    const inProgress =
      tasks?.filter((t) => t.status === "in_progress")?.length || 0;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, inProgress, completionRate };
  }, [tasks]);

  const distributionData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [stats.completed, stats.inProgress, stats.pending],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        hoverBackgroundColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 0,
        borderRadius: 5,
      },
    ],
  };

  const activityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [12, 19, 3, 5, 2, 3, 7],
        fill: true,
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.15)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#6366f1",
      },
      {
        label: "New Tasks",
        data: [7, 11, 5, 8, 3, 7, 4],
        fill: true,
        borderColor: "#a855f7",
        backgroundColor: "rgba(168, 85, 247, 0.15)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#a855f7",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { family: "Inter, sans-serif", size: 12, weight: "bold" },
          color: "#64748b",
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8", font: { weight: "600" } },
      },
      y: {
        grid: { color: "rgba(0, 0, 0, 0.05)", drawBorder: false },
        ticks: { color: "#94a3b8", font: { weight: "600" } },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

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
      <div className="flex flex-column lg:flex-row lg:align-items-center justify-content-between gap-4 mb-6">
        <div>
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`text-5xl font-bold text-900 m-0 tracking-tight ${styles.headerGradient}`}
          >
            Welcome back!
          </motion.h1>
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-600 mt-2 text-lg font-medium"
          >
            Here's what's happening with your workspace today.
          </motion.p>
        </div>

        <div className="flex gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              label="New AI Task"
              icon="pi pi-sparkles"
              className={`p-button-raised transition-all transition-duration-200 px-4 py-2 font-bold ${styles.newTaskButton}`}
              onClick={() => setShowAiDialog(true)}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              label="Export Report"
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
            title: "Total Tasks",
            value: stats.total,
            icon: "pi-folder-open",
            color: "indigo",
            subtitle: "All workspace items",
          },
          {
            title: "Completed",
            value: stats.completed,
            icon: "pi-check-circle",
            color: "teal",
            subtitle: `${stats.completionRate}% completion rate`,
          },
          {
            title: "Pending",
            value: stats.pending,
            icon: "pi-hourglass",
            color: "rose",
            subtitle: "Awaiting action",
          },
          {
            title: "Active",
            value: stats.inProgress,
            icon: "pi-bolt",
            color: "amber",
            subtitle: "Currently in progress",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={itemAnimations}
            whileHover="hover"
            className="col-12 md:col-6 lg:col-3"
          >
            <div
              className={`surface-card p-4 border-round-3xl shadow-1 h-full flex flex-column transition-all duration-300 hover:shadow-4 cursor-pointer relative overflow-hidden group ${styles.statsCard}`}
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
                  className={`flex align-items-center justify-content-center bg-${item.color}-50 border-round-2xl p-3 shadow-sm group-hover:scale-110 transition-transform ${styles.statsIconContainer}`}
                >
                  <i
                    className={`pi ${item.icon} text-${item.color}-600 text-2xl`}
                  />
                </div>
              </div>
              <div className="flex align-items-center gap-2 mt-auto">
                <span className="text-500 text-xs font-semibold">
                  {item.subtitle}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid mt-2">
        {/* Activity Timeline */}
        <motion.div variants={itemAnimations} className="col-12 lg:col-8">
          <div
            className={`p-5 border-round-3xl shadow-1 h-full ${styles.chartCard}`}
          >
            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex flex-column">
                <h2 className="text-2xl font-bold text-900 m-0">
                  Activity Timeline
                </h2>
                <span className="text-500 text-sm font-medium mt-1">
                  Growth overview last 7 days
                </span>
              </div>
              <div className="flex gap-2">
                <span className="flex align-items-center gap-1 text-xs font-bold px-2 py-1 border-round bg-indigo-50 text-indigo-600">
                  <i className="pi pi-circle-fill text-[8px]" /> Completed
                </span>
                <span className="flex align-items-center gap-1 text-xs font-bold px-2 py-1 border-round bg-purple-50 text-purple-600">
                  <i className="pi pi-circle-fill text-[8px]" /> New
                </span>
              </div>
            </div>
            <div className={styles.chartContainer}>
              <Chart
                type="line"
                data={activityData}
                options={chartOptions}
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Task Distribution */}
        <motion.div variants={itemAnimations} className="col-12 lg:col-4">
          <div
            className={`p-5 border-round-3xl shadow-1 h-full ${styles.chartCard}`}
          >
            <div className="flex flex-column mb-6">
              <h2 className="text-2xl font-bold text-900 m-0">
                Task Distribution
              </h2>
              <span className="text-500 text-sm font-medium mt-1">
                Status breakdown
              </span>
            </div>
            <div
              className={`flex align-items-center justify-content-center relative ${styles.chartContainer}`}
            >
              <Chart
                type="doughnut"
                data={distributionData}
                options={{
                  ...chartOptions,
                  cutout: "75%",
                  plugins: {
                    ...chartOptions.plugins,
                    legend: { display: true, position: "bottom" },
                  },
                }}
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
