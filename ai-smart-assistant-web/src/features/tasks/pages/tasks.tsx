import { useTaskStore } from "../../../store/task.store";
import { useTasks } from "../hooks/useTasks";
import { TaskList } from "../components/TaskList";
import { motion } from "framer-motion";
import { CustomButton } from "../../../components/CustomButton";
import { AiTaskDialog } from "../components/AiTaskDialog";
import { TaskDialog } from "../components/TaskDialog";
import type { CreateTask } from "../schemas/task.schema";
import styles from "../../../styles/features/tasks/TasksPage.module.css";
import { useEffect } from "react";

export default function TasksPage() {
  const { tasks, loading, loadTasks, updateTask, deleteTask } = useTasks();

  const {
    showAiDialog,
    setShowAiDialog,
    showEditDialog,
    setShowEditDialog,
    selectedTask,
    setSelectedTask,
  } = useTaskStore();

  useEffect(() => {
    loadTasks();
  }, []);

  const handleEdit = (task: CreateTask) => {
    setSelectedTask(task);
    setShowEditDialog(true);
  };

  return (
    <div className="flex flex-column gap-4">
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
          <CustomButton
            label="Refresh"
            icon="pi pi-refresh"
            text
            className="p-button-secondary font-semibold"
            loading={loading}
            onClick={loadTasks}
          />
          <CustomButton
            label="Generate New Task"
            icon="pi pi-sparkles"
            className={`p-button-raised transition-all transition-duration-200 ${styles.newTaskButton}`}
            onClick={() => setShowAiDialog(true)}
          />
        </div>
      </motion.div>

      <AiTaskDialog
        visible={showAiDialog}
        onHide={() => setShowAiDialog(false)}
        onSuccess={() => loadTasks()}
      />

      <TaskDialog
        visible={showEditDialog}
        onHide={() => setShowEditDialog(false)}
        task={selectedTask}
        onSave={updateTask}
      />

      <div className="surface-card p-4 border-round-2xl shadow-1">
        {loading ? (
          <div className="flex flex-column align-items-center justify-content-center py-8 gap-4">
            <i className="pi pi-spin pi-spinner text-4xl text-primary"></i>
            <span className="text-600 font-medium italic">
              Fetching your tasks...
            </span>
          </div>
        ) : (
          <TaskList tasks={tasks} onEdit={handleEdit} onDelete={deleteTask} />
        )}
      </div>
    </div>
  );
}
