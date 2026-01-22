import type { CreateTask } from "../schemas/task.schema";
import { httpClient } from "../../../api/httpClient";

export const fetchTasks = async (): Promise<CreateTask[]> => {
  return (await httpClient.get("/tasks")) as unknown as CreateTask[];
};

export const createTask = async (title: string): Promise<CreateTask> => {
  return (await httpClient.post("/tasks", {
    title,
  })) as unknown as CreateTask;
};

export const createTaskWithAi = async (title: string): Promise<CreateTask> => {
  return (await httpClient.post("/tasks/ai", {
    title,
  })) as unknown as CreateTask;
};
