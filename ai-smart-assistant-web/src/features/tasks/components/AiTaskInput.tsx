import { useTaskStore } from "../../../store/task.store";
import { useTasks } from "../hooks/useTasks";
import type { CreateTask } from "../schemas/task.schema";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../../styles/features/tasks/AiTaskInput.module.css";

export function AITaskInput({
  onCreated,
}: {
  onCreated: (task?: CreateTask) => void;
}) {
  const input = useTaskStore((s) => s.aiTaskInputText);
  const setInput = useTaskStore((s) => s.setAiTaskInputText);
  const loading = useTaskStore((s) => s.loading);
  const setLoading = useTaskStore((s) => s.setLoading);

  const { addLocalTask } = useTasks();

  const submit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      await addLocalTask({ title: input } as any);
      setInput("");
      onCreated();
    } catch (error) {
      console.error("Failed to create AI task", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="p-1"
    >
      <div
        className={`surface-card p-1 shadow-2 border-round-3xl border-1 surface-border relative overflow-hidden group ${styles.aiTaskCard}`}
      >
        <div
          className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-purple-500 to-pink-500 ${styles.topBarGradient}`}
        ></div>

        <div className="p-4 md:p-5">
          <div className="flex flex-column gap-3">
            <div className="flex align-items-center gap-2 text-900 font-bold mb-1">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
              >
                <i className="pi pi-sparkles text-xl text-purple-600"></i>
              </motion.div>
              <span
                className={`text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 ${styles.neuraTextGradient}`}
              >
                Neura AI
              </span>
            </div>

            <div className="relative w-full">
              <InputTextarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={1}
                autoResize
                placeholder="✨ Describe your task... (e.g., 'Draft a report for Friday')"
                className={`w-full text-lg p-3 border-round-2xl bg-white-alpha-50 border-none shadow-inner focus:shadow-sm transition-all ${styles.taskInput}`}
                disabled={loading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
              />
              <div className="absolute bottom-0 right-0 p-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    icon={loading ? "pi pi-spin pi-spinner" : "pi pi-arrow-up"}
                    rounded
                    text={!input.trim()}
                    raised={!!input.trim()}
                    disabled={!input.trim() || loading}
                    onClick={submit}
                    className={
                      !!input.trim()
                        ? `bg-gradient-to-r from-purple-600 to-pink-600 border-none ${styles.submitButtonActive}`
                        : "text-gray-400"
                    }
                    aria-label="Create Task"
                  />
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex align-items-center gap-2 text-purple-600 text-sm pl-2 font-medium">
                    <motion.i
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="pi pi-cog"
                    />
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Generating magic...
                    </motion.span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
