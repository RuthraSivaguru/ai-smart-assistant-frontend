import type { CreateTask, UpdateTask } from "../schemas/task.schema";
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

export const updateTask = async (
  id: string,
  task: Partial<UpdateTask>,
): Promise<UpdateTask> => {
  return (await httpClient.put(
    `/tasks/update/${id}`,
    task,
  )) as unknown as UpdateTask;
};

export const deleteTask = async (id: string): Promise<void> => {
  await httpClient.delete(`/tasks/delete/${id}`);
};
