import { useMemo } from "react";
import { useTasks } from "../../tasks/hooks/useTask";
import { Chart } from "primereact/chart";
import { motion, type Variants } from "framer-motion";
import styles from "../../../styles/features/analytics/AnalyticsPage.module.css";

export default function AnalyticsPage() {
  const { tasks } = useTasks();

  const stats = useMemo(() => {
    const total = tasks?.length || 0;
    const completed =
      tasks?.filter((t) => t.status === "completed")?.length || 0;
    const inProgress =
      tasks?.filter((t) => t.status === "in_progress")?.length || 0;
    const pending = tasks?.filter((t) => t.status === "pending")?.length || 0;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, pending, completionRate };
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
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.4,
      },
      {
        label: "New Tasks",
        data: [7, 11, 5, 8, 3, 7, 4],
        fill: true,
        borderColor: "#a855f7",
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { family: "Inter, sans-serif", size: 12 },
        },
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
      },
    },
  };

  const itemAnimations: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={containerAnimations}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto p-4 space-y-8"
    >
      {/* Header */}
      <div className="mb-6">
        <h1
          className={`text-4xl font-bold text-900 tracking-tight ${styles.headerGradient}`}
        >
          Analytics Overview
        </h1>
        <p className="text-600 mt-2 font-medium">
          Deep dive into your productivity and task management patterns.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid">
        {[
          {
            label: "Completion Rate",
            value: `${stats.completionRate}%`,
            icon: "pi-percentage",
            color: "indigo",
          },
          {
            label: "Tasks Done",
            value: stats.completed,
            icon: "pi-check-circle",
            color: "teal",
          },
          {
            label: "Active Projects",
            value: stats.inProgress,
            icon: "pi-box",
            color: "amber",
          },
          {
            label: "Total Tasks",
            value: stats.total,
            icon: "pi-list",
            color: "blue",
          },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemAnimations}
            className="col-12 md:col-6 lg:col-3"
          >
            <div className="surface-card p-4 border-round-2xl shadow-1 border-1 border-transparent hover:shadow-4 transition-all h-full">
              <div className="flex justify-content-between align-items-center">
                <div>
                  <span className="text-500 font-bold uppercase text-xs tracking-widest">
                    {stat.label}
                  </span>
                  <div className="text-3xl font-black text-900 mt-1">
                    {stat.value}
                  </div>
                </div>
                <div
                  className={`w-3rem h-3rem bg-${stat.color}-50 text-${stat.color}-600 border-round-xl flex align-items-center justify-content-center`}
                >
                  <i className={`pi ${stat.icon} text-xl`} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid mt-4">
        {/* Activity Timeline */}
        <motion.div variants={itemAnimations} className="col-12 lg:col-8">
          <div className="surface-card p-5 border-round-3xl shadow-2 h-full">
            <div className="flex align-items-center justify-content-between mb-6">
              <h2 className="text-xl font-bold text-900 m-0">
                Activity Timeline
              </h2>
              <span className="text-500 text-sm">Last 7 Days</span>
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
          <div className="surface-card p-5 border-round-3xl shadow-2 h-full">
            <h2 className="text-xl font-bold text-900 mb-6">Task Status</h2>
            <div
              className={`flex align-items-center justify-content-center relative ${styles.chartContainer}`}
            >
              <Chart
                type="doughnut"
                data={distributionData}
                options={{ ...chartOptions, cutout: "70%" }}
                className="w-full h-full"
              />
              <div className="absolute flex flex-column align-items-center">
                <span className="text-4xl font-black text-900">
                  {stats.total}
                </span>
                <span className="text-500 text-xs font-bold uppercase">
                  Total
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
