import { useEffect, useState } from "react";
import { fetchTasks, createTask } from "../api/tasks.api";
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
    setTasks((prev) => [newTask, ...prev]);
  };

  const addLocalTask = (task: CreateTask) => {
    setTasks((prev) => [task, ...prev]);
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
  };
}
