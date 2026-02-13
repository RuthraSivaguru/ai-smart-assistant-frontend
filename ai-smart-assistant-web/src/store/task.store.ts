import { create } from "zustand";
import type { CreateTask } from "../features/tasks/schemas/task.schema";

interface TaskState {
  tasks: CreateTask[];
  loading: boolean;
  showAiDialog: boolean;
  showEditDialog: boolean;
  selectedTask: CreateTask | undefined;

  // Form States
  taskFormTitle: string;
  aiTaskInputText: string;
  editTaskFormData: Partial<CreateTask>;

  // Setters
  setTasks: (tasks: CreateTask[]) => void;
  setLoading: (loading: boolean) => void;
  setShowAiDialog: (show: boolean) => void;
  setShowEditDialog: (show: boolean) => void;
  setSelectedTask: (task: CreateTask | undefined) => void;
  setTaskFormTitle: (title: string) => void;
  setAiTaskInputText: (text: string) => void;
  setEditTaskFormData: (form: Partial<CreateTask>) => void;
  updateEditTaskFormField: (key: keyof CreateTask, value: any) => void;

  // Pure State Actions
  addTask: (task: CreateTask) => void;
  updateTask: (id: string, task: Partial<CreateTask>) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  showAiDialog: false,
  showEditDialog: false,
  selectedTask: undefined,

  taskFormTitle: "",
  aiTaskInputText: "",
  editTaskFormData: {},

  setTasks: (tasks) => set({ tasks }),
  setLoading: (loading) => set({ loading }),
  setShowAiDialog: (showAiDialog) => set({ showAiDialog }),
  setShowEditDialog: (showEditDialog) => set({ showEditDialog }),
  setSelectedTask: (selectedTask) => {
    set({ selectedTask });
    if (selectedTask) {
      set({
        editTaskFormData: {
          ...selectedTask,
          dueDate: selectedTask.dueDate
            ? new Date(selectedTask.dueDate)
            : undefined,
        },
      });
    } else {
      set({ editTaskFormData: {} });
    }
  },
  setTaskFormTitle: (taskFormTitle) => set({ taskFormTitle }),
  setAiTaskInputText: (aiTaskInputText) => set({ aiTaskInputText }),
  setEditTaskFormData: (editTaskFormData) => set({ editTaskFormData }),
  updateEditTaskFormField: (key, value) =>
    set((state) => ({
      editTaskFormData: { ...state.editTaskFormData, [key]: value },
    })),

  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),

  updateTask: (id, task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t)),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
}));
