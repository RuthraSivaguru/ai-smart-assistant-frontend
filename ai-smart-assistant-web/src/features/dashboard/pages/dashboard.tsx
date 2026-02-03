import { useMemo } from "react";
import { TaskForm } from "../../tasks/components/TaskForm";
import { TaskList } from "../../tasks/components/TaskList";
import { useTasks } from "../../tasks/hooks/useTask";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import { AITaskInput } from "../../tasks/components/AiTaskInput";
import { motion, type Variants } from "framer-motion";

export default function Dashboard() {
  const { tasks, addTask, loadTasks, addLocalTask } = useTasks();

  const stats = useMemo(() => {
    const total = tasks?.length || 0;
    const completed =
      tasks?.filter((t) => t.status === "completed")?.length || 0;
    const pending = tasks?.filter((t) => t.status === "pending")?.length || 0;
    const inProgress =
      tasks?.filter((t) => t.status === "in_progress")?.length || 0;
    return { total, completed, pending, inProgress };
  }, [tasks]);

  const chartData = {
    labels: ["Completed", "Pending", "In Progress"],
    datasets: [
      {
        data: [stats.completed, stats.pending, stats.inProgress],
        backgroundColor: ["#10b981", "#ef4444", "#f59e0b"],
        hoverBackgroundColor: ["#059669", "#dc2626", "#d97706"],
        borderWidth: 0,
        hoverOffset: 15,
      },
    ],
  };

  const chartOptions = {
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#1e293b",
          usePointStyle: true,
          font: {
            size: 14,
            family: "Inter, sans-serif",
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
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
    hidden: { opacity: 0, scale: 0.9, y: 20 },
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
            className="text-4xl font-bold text-900 m-0 tracking-tight"
            style={{
              background: "linear-gradient(to right, #1e293b, #4f46e5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
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

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            label="Generate Report"
            icon="pi pi-file-export"
            className="p-button-outlined p-button-secondary border-round-xl px-4 py-2 font-bold transition-all"
          />
        </motion.div>
      </div>

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
              className="surface-card p-4 border-round-2xl shadow-1 h-full flex flex-column transition-all duration-300 hover:shadow-4 cursor-pointer relative overflow-hidden group"
              style={{
                border: "1px solid rgba(0,0,0,0.05)",
              }}
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
                  className={`flex align-items-center justify-content-center bg-${item.color}-50 border-round-xl p-3 shadow-sm group-hover:scale-110 transition-transform`}
                  style={{ width: "3.5rem", height: "3.5rem" }}
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

        {/* Main Area */}
        <motion.div variants={itemAnimations} className="col-12 lg:col-8 mt-4">
          <div
            className="surface-card border-round-3xl shadow-3 h-full overflow-hidden border-1 border-transparent"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="p-4 md:p-6 border-bottom-1 surface-border flex justify-content-between align-items-center">
              <div className="flex align-items-center gap-3">
                <div className="bg-indigo-50 p-2 border-round-lg text-indigo-600">
                  <i className="pi pi-list text-2xl"></i>
                </div>
                <span className="text-2xl font-black text-900">
                  Task Workspace
                </span>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <div className="mb-6">
                <TaskForm onAdd={addTask} />
              </div>

              <div className="mb-6">
                <AITaskInput
                  onCreated={(task) => {
                    if (task) {
                      addLocalTask(task);
                    } else {
                      loadTasks();
                    }
                  }}
                />
              </div>

              <div className="mt-4">
                <TaskList tasks={tasks} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Distribution Chart */}
        <motion.div variants={itemAnimations} className="col-12 lg:col-4 mt-4">
          <div
            className="surface-card border-round-3xl shadow-3 h-full flex flex-column bg-white border-1 border-transparent"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="p-4 md:p-6 border-bottom-1 surface-border">
              <span className="text-2xl font-black text-900">Distribution</span>
            </div>
            <div className="p-6 flex flex-column align-items-center justify-content-center h-full flex-grow-1">
              <div className="w-full relative" style={{ height: "320px" }}>
                <Chart
                  type="doughnut"
                  data={chartData}
                  options={{
                    ...chartOptions,
                    maintainAspectRatio: false,
                  }}
                  className="w-full h-full"
                />
                <div
                  className="absolute top-50 left-50 flex flex-column align-items-center justify-content-center"
                  style={{
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                  }}
                >
                  <span className="text-5xl font-black text-900">
                    {stats.total}
                  </span>
                  <span className="text-500 font-bold text-sm uppercase tracking-widest">
                    Total
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
