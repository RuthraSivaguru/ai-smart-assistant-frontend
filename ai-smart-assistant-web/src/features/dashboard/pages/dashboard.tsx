import { useMemo } from "react";
import { TaskForm } from "../../tasks/components/TaskForm";
import { TaskList } from "../../tasks/components/TaskList";
import { useAuthStore } from "../../../store/auth.store";
import { useTasks } from "../../tasks/hooks/useTask";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import { AITaskInput } from "../../tasks/components/AiTaskInput";
import { motion, type Variants } from "framer-motion";

export default function Dashboard() {
  const logout = useAuthStore((s) => s.logout);
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemAnimations: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 50 },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <div
      className="min-h-screen p-3 md:p-5 relative overflow-hidden flex flex-column"
      style={{
        fontFamily: "Outfit, Inter, sans-serif",
        background: "transparent",
      }}
    >
      {/* Animated Background Mesh */}
      <div
        className="fixed inset-0 top-0 left-0 w-full h-full -z-1 overflow-hidden"
        style={{ background: "#f8fafc" }}
      >
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-30rem h-30rem bg-indigo-200 border-circle opacity-20 blur-3xl origin-center"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-40rem h-40rem bg-purple-200 border-circle opacity-20 blur-3xl origin-center"
        />
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-50 left-50 w-20rem h-20rem bg-pink-200 border-circle opacity-20 blur-3xl"
        />
      </div>

      <motion.div
        variants={containerAnimations}
        initial="hidden"
        animate="show"
        className="relative z-1 max-w-7xl mx-auto w-full"
      >
        {/* Header */}
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center mb-6 gap-3">
          <div className="flex align-items-center gap-3">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="bg-white border-round-xl p-3 shadow-4 flex align-items-center justify-content-center gradient-border"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              }}
            >
              <i className="pi pi-bolt text-3xl text-white"></i>
            </motion.div>
            <div className="flex flex-column">
              <h1
                className="text-4xl font-extrabold text-900 m-0 tracking-tight"
                style={{
                  background: "linear-gradient(to right, #1e293b, #4f46e5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                NeuraTask
              </h1>
              <span className="text-500 font-medium text-sm">
                Design your day, intelligently.
              </span>
            </div>
          </div>
          <Button
            label="Logout"
            icon="pi pi-power-off"
            text
            className="text-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300 font-semibold border-round-lg px-4 py-2"
            onClick={logout}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid">
          {[
            {
              title: "Total Tasks",
              value: stats.total,
              icon: "pi-folder",
              color: "blue",
              sub: "All tasks tracked",
            },
            {
              title: "Completed",
              value: stats.completed,
              icon: "pi-check-circle",
              color: "green",
              sub: "Successfully finished",
            },
            {
              title: "Pending",
              value: stats.pending,
              icon: "pi-clock",
              color: "red",
              sub: "Waiting for action",
            },
            {
              title: "In Progress",
              value: stats.inProgress,
              icon: "pi-spin pi-spinner",
              color: "yellow",
              sub: "Currently active",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemAnimations}
              whileHover="hover"
              className="col-12 md:col-6 lg:col-3"
            >
              <div
                className="surface-card p-4 border-round-2xl shadow-1 h-full flex flex-column justify-content-between transition-colors duration-300"
                style={{
                  backdropFilter: "blur(12px)",
                  background: "rgba(255, 255, 255, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.6)",
                }}
              >
                <div className="flex justify-content-between align-items-start mb-4">
                  <div className="flex flex-column">
                    <span className="text-500 font-semibold mb-2 uppercase text-xs tracking-wider">
                      {item.title}
                    </span>
                    <span className="text-900 font-bold text-4xl">
                      {item.value}
                    </span>
                  </div>
                  <div
                    className={`flex align-items-center justify-content-center bg-${item.color}-100 border-round-xl p-3 shadow-sm`}
                    style={{ width: "3.5rem", height: "3.5rem" }}
                  >
                    <i
                      className={`pi ${item.icon} text-${item.color}-600 text-2xl`}
                    />
                  </div>
                </div>
                <span className="text-500 text-sm font-medium">{item.sub}</span>
              </div>
            </motion.div>
          ))}

          {/* Main Area */}
          <motion.div
            variants={itemAnimations}
            className="col-12 lg:col-8 mt-3"
          >
            <div
              className="surface-card border-round-3xl shadow-1 h-full overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
              }}
            >
              <div className="p-4 md:p-5 border-bottom-1 surface-border flex justify-content-between align-items-center bg-white-alpha-50">
                <div className="flex align-items-center gap-3">
                  <div className="bg-primary-50 p-2 border-round-lg text-primary">
                    <i className="pi pi-list text-xl"></i>
                  </div>
                  <span className="text-xl font-bold text-900">
                    Task Management
                  </span>
                </div>
              </div>
              <div className="p-4 md:p-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-5 surface-ground p-4 border-round-2xl border-1 surface-border shadow-none"
                >
                  <TaskForm onAdd={addTask} />
                </motion.div>

                <div className="mb-5">
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

                <div className="mt-2">
                  <TaskList tasks={tasks} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Distribution Chart */}
          <motion.div
            variants={itemAnimations}
            className="col-12 lg:col-4 mt-3"
          >
            <div
              className="surface-card border-round-3xl shadow-1 h-full flex flex-column"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
              }}
            >
              <div className="p-4 md:p-5 border-bottom-1 surface-border bg-white-alpha-50">
                <span className="text-xl font-bold text-900">
                  Task Overview
                </span>
              </div>
              <div className="p-5 flex flex-column align-items-center justify-content-center h-full flex-grow-1">
                <div className="w-full relative" style={{ height: "300px" }}>
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
                    <span className="text-5xl font-bold text-900">
                      {stats.total}
                    </span>
                    <span className="text-500 font-medium text-sm uppercase tracking-wide">
                      Tasks
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
