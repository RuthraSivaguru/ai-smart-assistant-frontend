import { Dialog } from "primereact/dialog";
import { AITaskInput } from "./AiTaskInput";
import type { CreateTask } from "../schemas/task.schema";
import styles from "../../../styles/features/tasks/AiTaskDialog.module.css";

interface AiTaskDialogProps {
  visible: boolean;
  onHide: () => void;
  onSuccess?: (task?: CreateTask) => void;
}

export const AiTaskDialog = ({
  visible,
  onHide,
  onSuccess,
}: AiTaskDialogProps) => {
  return (
    <Dialog
      header={
        <div className="flex align-items-center gap-2">
          <i className="pi pi-sparkles text-purple-600 text-xl"></i>
          <span className="text-xl font-bold font-italic">AI Task Magic</span>
        </div>
      }
      visible={visible}
      onHide={onHide}
      className={`border-round-2xl ${styles.aiTaskDialog}`}
    >
      <div className="p-4 bg-slate-50">
        <AITaskInput
          onCreated={(task) => {
            if (onSuccess) {
              onSuccess(task);
            }
            onHide();
          }}
        />
      </div>
    </Dialog>
  );
};
