import { useState } from "react";
import type { CreateTask } from "../schemas/task.schema";
import { httpClient } from "../../../api/httpClient";

export function AITaskInput({
  onCreated,
}: {
  onCreated: (task?: CreateTask) => void;
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const res = await httpClient.post("/tasks/ai", { input });
    setInput("");
    setLoading(false);
    onCreated(res.data);
  };

  return (
    <div>
      <input
        placeholder="Tell NeuraTask what to do…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={submit} disabled={loading}>
        {loading ? "Thinking…" : "Add with AI"}
      </button>
    </div>
  );
}
