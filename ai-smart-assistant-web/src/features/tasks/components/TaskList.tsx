import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import type { CreateTask } from "../schemas/task.schema";

export function TaskList({ tasks }: { tasks: CreateTask[] }) {
  const statusBodyTemplate = (rowData: CreateTask) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)}></Tag>
    );
  };

  const getSeverity = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "in_progress":
        return "warning";
      case "pending":
        return "danger";
      default:
        return null;
    }
  };

  return (
    <div className="card">
      <DataTable value={tasks} tableStyle={{ minWidth: "50rem" }}>
        <Column field="title" header="Title"></Column>
        <Column field="description" header="Description"></Column>
        <Column header="Status" body={statusBodyTemplate}></Column>
        <Column field="dueDate" header="Due Date"></Column>
      </DataTable>
    </div>
  );
}
