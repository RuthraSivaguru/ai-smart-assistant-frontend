import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import type { CreateTask } from "../schemas/task.schema";

export function TaskList({ tasks }: { tasks: CreateTask[] }) {
  const statusBodyTemplate = (rowData: CreateTask) => {
    const config: Record<
      string,
      {
        severity: "success" | "warning" | "danger" | "info" | null;
        icon: string;
      }
    > = {
      completed: { severity: "success", icon: "pi pi-check-circle" },
      in_progress: { severity: "warning", icon: "pi pi-sync pi-spin" },
      pending: { severity: "danger", icon: "pi pi-clock" },
      default: { severity: "info", icon: "pi pi-info-circle" },
    };

    const { severity, icon } = config[rowData.status] || config.default;

    return (
      <Tag
        value={rowData.status.replace("_", " ")}
        severity={severity}
        rounded
        className="px-3 font-bold uppercase text-xs"
        icon={icon}
        style={{ letterSpacing: "0.05em" }}
      />
    );
  };

  const actionBodyTemplate = () => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-pencil" rounded text severity="info" size="small" />
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          size="small"
        />
      </div>
    );
  };

  const titleBodyTemplate = (rowData: CreateTask) => {
    return (
      <div className="flex flex-column gap-1">
        <span className="font-bold text-900">{rowData.title}</span>
        <span
          className="text-500 text-xs font-medium white-space-nowrap overflow-hidden text-overflow-ellipsis"
          style={{ maxWidth: "250px" }}
        >
          {rowData.description}
        </span>
      </div>
    );
  };

  const dateBodyTemplate = (rowData: CreateTask) => {
    const dateStr =
      rowData.dueDate instanceof Date
        ? rowData.dueDate.toLocaleDateString()
        : rowData.dueDate || "No date set";

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
      className="p-datatable-custom"
    >
      <DataTable
        value={tasks}
        rows={5}
        paginator={tasks.length > 5}
        emptyMessage="No tasks found. Start by creating one!"
        responsiveLayout="stack"
        breakpoint="960px"
        stripedRows
        size="large"
        className="border-round-xl overflow-hidden shadow-none"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          header="Task Information"
          body={titleBodyTemplate}
          style={{ width: "40%" }}
        />
        <Column
          header="Due Date"
          body={dateBodyTemplate}
          style={{ width: "20%" }}
        />
        <Column
          header="Status"
          body={statusBodyTemplate}
          style={{ width: "20%" }}
        />
        <Column
          header="Actions"
          body={actionBodyTemplate}
          style={{ width: "20%" }}
          headerStyle={{ textAlign: "center" }}
          bodyStyle={{ textAlign: "center" }}
        />
      </DataTable>

      <style>{`
        .p-datatable-custom .p-datatable-thead > tr > th {
          background: #f8fafc;
          color: #64748b;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          padding: 1.25rem 1rem;
          border-bottom: 2px solid #f1f5f9;
        }

        .p-datatable-custom .p-datatable-tbody > tr {
          transition: all 0.2s;
        }

        .p-datatable-custom .p-datatable-tbody > tr:hover {
          background: #f1f5f9 !important;
          transform: scale(1.002);
        }

        .p-datatable-custom .p-datatable-tbody > tr > td {
          padding: 1.25rem 1rem;
          border-bottom: 1px solid #f1f5f9;
        }
      `}</style>
    </motion.div>
  );
}
