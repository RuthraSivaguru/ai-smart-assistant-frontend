import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { confirmDialog } from "primereact/confirmdialog";
import { CustomButton } from "../../../components/CustomButton";
import { motion } from "framer-motion";
import type { CreateTask } from "../schemas/task.schema";
import styles from "../../../styles/features/tasks/TaskList.module.css";

export function TaskList({
  tasks,
  onEdit,
  onDelete,
}: {
  tasks: CreateTask[];
  onEdit: (task: CreateTask) => void;
  onDelete: (id: string) => void;
}) {
  const statusBodyTemplate = (rowData: CreateTask) => {
    const config: Record<
      string,
      {
        severity: "success" | "warning" | "danger" | "info" | null;
        icon: string;
      }
    > = {
      completed: { severity: "success", icon: "pi pi-check-circle" },
      in_progress: { severity: "warning", icon: "pi pi-sync" },
      pending: { severity: "danger", icon: "pi pi-clock" },
      default: { severity: "info", icon: "pi pi-info-circle" },
    };

    const { severity, icon } = config[rowData.status] || config.default;

    return (
      <Tag
        value={rowData?.status?.replace("_", " ")}
        severity={severity}
        rounded
        className={`px-3 font-semibold uppercase text-[12px] ${styles.statusTag}`}
        icon={icon}
      />
    );
  };

  const actionBodyTemplate = (rowData: CreateTask) => {
    return (
      <div className="flex gap-2">
        <CustomButton
          icon="pi pi-pencil"
          rounded
          text
          severity="info"
          size="small"
          onClick={() => onEdit(rowData)}
        />
        <CustomButton
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          size="small"
          onClick={() => {
            if (rowData.id) {
              confirmDialog({
                message: `Are you sure you want to delete "${rowData.title}"?`,
                header: "Confirm Deletion",
                icon: "pi pi-exclamation-triangle",
                acceptClassName: "p-button-danger",
                accept: () => onDelete(rowData.id!),
              });
            }
          }}
        />
      </div>
    );
  };

  const titleBodyTemplate = (rowData: CreateTask) => {
    return (
      <div className="flex flex-column gap-1">
        <span className="font-bold text-900">{rowData.title}</span>
        <span
          className={`text-500 text-xs font-medium white-space-nowrap overflow-hidden text-overflow-ellipsis ${styles.titleDescription}`}
        >
          {rowData.description}
        </span>
      </div>
    );
  };

  const dateBodyTemplate = (rowData: CreateTask) => {
    if (!rowData.dueDate)
      return <span className="text-400 italic">No date set</span>;

    const date = new Date(rowData.dueDate);
    const isValid = !isNaN(date.getTime());

    const dateStr = isValid
      ? new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(date)
      : "Invalid Date";

    return (
      <div className="flex align-items-center gap-2 text-600 font-medium text-sm">
        <i className="pi pi-calendar text-primary-300"></i>
        <span>{dateStr}</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.dataTable}
    >
      <DataTable
        value={tasks}
        rows={10}
        paginator={tasks.length > 10}
        emptyMessage="No tasks found. Start by creating one!"
        breakpoint="960px"
        stripedRows
        size="large"
        className="border-round-xl overflow-hidden shadow-none"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          header="Task Information"
          body={titleBodyTemplate}
          className={styles.colTaskInfo}
        />
        <Column
          header="Due Date"
          body={dateBodyTemplate}
          className={styles.colDueDate}
        />
        <Column
          header="Status"
          body={statusBodyTemplate}
          className={styles.colStatus}
        />
        <Column
          header="Actions"
          body={actionBodyTemplate}
          className={styles.colActions}
        />
      </DataTable>
    </motion.div>
  );
}
