import { useTasks } from "../hooks/useTask";
import { TaskList } from "../components/TaskList";
import { motion } from "framer-motion";
import { Button } from "primereact/button";

export default function TasksPage() {
  const { tasks, loading, loadTasks } = useTasks();

  return (
    <div className="p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex align-items-center justify-content-between mb-6"
      >
        <div className="flex flex-column gap-1">
          <h1 className="text-4xl font-bold text-900 m-0">My Tasks</h1>
          <p className="text-600 font-medium">
            Manage and track your daily activities
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            label="Refresh"
            icon="pi pi-refresh"
            text
            className="p-button-secondary font-semibold"
            loading={loading}
            onClick={loadTasks}
          />
          <Button
            label="Create New Task"
            icon="pi pi-plus"
            className="p-button-raised transition-all transition-duration-200"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              border: "none",
            }}
          />
        </div>
      </motion.div>

      <div className="surface-card p-4 border-round-2xl shadow-1">
        {loading ? (
          <div className="flex flex-column align-items-center justify-content-center py-8 gap-4">
            <i className="pi pi-spin pi-spinner text-4xl text-primary"></i>
            <span className="text-600 font-medium italic">
              Fetching your tasks...
            </span>
          </div>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </div>
    </div>
  );
}
