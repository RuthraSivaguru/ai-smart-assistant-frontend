import { useTaskStore } from "../../../store/task.store";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export function TaskForm({ onAdd }: { onAdd: (title: string) => void }) {
  const { taskFormTitle, setTaskFormTitle } = useTaskStore();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskFormTitle.trim()) return;
    onAdd(taskFormTitle);
    setTaskFormTitle("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <InputText
        placeholder="Add a new task..."
        value={taskFormTitle}
        onChange={(e) => setTaskFormTitle(e.target.value)}
        className="w-full"
      />
      <Button icon="pi pi-plus" type="submit" label="Add" />
    </form>
  );
}
