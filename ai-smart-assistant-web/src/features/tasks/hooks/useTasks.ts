import { useTaskStore } from "../../../store/task.store";
import {
  fetchTasks,
  createTask as createTaskApi,
  createTaskWithAi as createTaskWithAiApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "../api/tasks.api";
import type { CreateTask } from "../schemas/task.schema";

export const useTasks = () => {
  const {
    tasks,
    loading,
    setTasks,
    setLoading,
    addTask: addInStore,
    updateTask: updateInStore,
    deleteTask: deleteInStore,
  } = useTaskStore();

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title: string) => {
    try {
      const newTask = await createTaskApi(title);
      addInStore(newTask);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const addLocalTask = async (task: CreateTask) => {
    try {
      const newTaskwithAi = await createTaskWithAiApi(task.title);
      addInStore(newTaskwithAi);
    } catch (error) {
      console.error("Failed to add AI task:", error);
    }
  };

  const updateTask = async (id: string, task: Partial<CreateTask>) => {
    console.log("Updating task", id, task);
    const previousTasks = useTaskStore.getState().tasks;
    // Optimistic update
    updateInStore(id, task);

    try {
      await updateTaskApi(id, task);
    } catch (error) {
      console.error("Failed to update task", error);
      // Revert on failure
      setTasks(previousTasks);
    }
  };

  const deleteTask = async (id: string) => {
    const previousTasks = useTaskStore.getState().tasks;
    // Optimistic update
    deleteInStore(id);

    try {
      await deleteTaskApi(id);
    } catch (error) {
      console.error("Failed to delete task", error);
      // Revert on failure
      setTasks(previousTasks);
    }
  };

  return {
    tasks,
    loading,
    loadTasks,
    addTask,
    addLocalTask,
    updateTask,
    deleteTask,
  };
};
