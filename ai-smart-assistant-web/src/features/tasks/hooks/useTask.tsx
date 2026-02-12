import { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  createTaskWithAi,
  updateTask as updateTaskApi,
} from "../api/tasks.api";
import type { CreateTask } from "../schemas/task.schema";

export function useTasks() {
  const [tasks, setTasks] = useState<CreateTask[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    const data = await fetchTasks();
    setTasks(data);
    setLoading(false);
  };

  const addTask = async (title: string) => {
    const newTask = await createTask(title);
    console.log("`newTask``", newTask);
    setTasks((prev) => [newTask, ...prev]);
  };

  const addLocalTask = async (task: CreateTask) => {
    const newTaskwithAi = await createTaskWithAi(task.title);
    console.log("`newTaskwithAi``", newTaskwithAi);
    setTasks((prev) => [newTaskwithAi, ...prev]);
  };

  const updateTask = async (id: string, task: Partial<CreateTask>) => {
    // Optimistic update
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...task } : t)));

    try {
      await updateTaskApi(id, task);
    } catch (error) {
      console.error("Failed to update task", error);
      // Revert on failure (reload tasks)
      loadTasks();
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    addTask,
    loadTasks,
    addLocalTask,
    updateTask,
  };
}
