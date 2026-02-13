import { useTaskStore } from "../../../store/task.store";
import { Dialog } from "primereact/dialog";
import { CustomInput } from "../../../components/CustomInput";
import { CustomTextarea } from "../../../components/CustomTextarea";
import { CustomDropdown } from "../../../components/CustomDropdown";
import { CustomCalendar } from "../../../components/CustomCalendar";
import { CustomButton } from "../../../components/CustomButton";
import type { CreateTask } from "../schemas/task.schema";

interface TaskDialogProps {
  visible: boolean;
  onHide: () => void;
  task?: CreateTask;
  onSave: (id: string, task: Partial<CreateTask>) => void;
}

export function TaskDialog({ visible, onHide, task, onSave }: TaskDialogProps) {
  const formData = useTaskStore((s) => s.editTaskFormData);
  const handleChange = useTaskStore((s) => s.updateEditTaskFormField);

  const handleSave = () => {
    if (task?.id) {
      onSave(task.id, formData);
      onHide();
    }
  };

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in_progress" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="Edit Task"
      className="p-fluid w-full md:w-6 lg:w-4"
    >
      <div className="flex flex-column gap-4 mt-2">
        <CustomInput
          label="Title"
          id="title"
          value={formData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Task Title"
        />

        <CustomTextarea
          label="Description"
          id="description"
          value={formData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
          autoResize
          placeholder="Task Description"
        />

        <CustomDropdown
          label="Status"
          id="status"
          value={formData.status}
          options={statusOptions}
          onChange={(e) => handleChange("status", e.value)}
          placeholder="Select Status"
        />

        <CustomCalendar
          label="Due Date"
          id="dueDate"
          value={formData.dueDate}
          onChange={(e) => handleChange("dueDate", e.value)}
          dateFormat="mm/dd/yy"
          showIcon
        />

        <div className="flex justify-content-end gap-2 mt-4">
          <CustomButton
            label="Cancel"
            icon="pi pi-times"
            text
            onClick={onHide}
            className="p-button-secondary"
          />
          <CustomButton label="Save" icon="pi pi-check" onClick={handleSave} />
        </div>
      </div>
    </Dialog>
  );
}
