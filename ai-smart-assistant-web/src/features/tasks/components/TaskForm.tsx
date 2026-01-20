import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export function TaskForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <InputText
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full"
      />
      <Button icon="pi pi-plus" type="submit" label="Add" />
    </form>
  );
}
