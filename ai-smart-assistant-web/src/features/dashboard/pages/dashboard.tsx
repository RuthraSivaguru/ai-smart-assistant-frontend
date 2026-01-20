import { useMemo } from "react";
import { TaskForm } from "../../tasks/components/TaskForm";
import { TaskList } from "../../tasks/components/TaskList";
import { useAuthStore } from "../../../store/auth.store";
import { useTasks } from "../../tasks/hooks/useTask";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import { AITaskInput } from "../../tasks/components/AiTaskInput";

export default function Dashboard() {
  const logout = useAuthStore((s) => s.logout);
  const { tasks, addTask, loadTasks, addLocalTask } = useTasks();

  const stats = useMemo(() => {
    const total = tasks?.length;
    const completed = tasks?.filter((t) => t.status === "completed")?.length;
    const pending = tasks?.filter((t) => t.status === "pending")?.length;
    const inProgress = tasks?.filter((t) => t.status === "in_progress")?.length;
    return { total, completed, pending, inProgress };
  }, [tasks]);

  const chartData = {
    labels: ["Completed", "Pending", "In Progress"],
    datasets: [
      {
        data: [stats.completed, stats.pending, stats.inProgress],
        backgroundColor: ["#22C55E", "#EF4444", "#F59E0B"],
        hoverBackgroundColor: ["#16A34A", "#DC2626", "#D97706"],
      },
    ],
  };

  const chartOptions = {
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <h1 className="text-3xl font-bold text-900 m-0">NeuraTask Dashboard</h1>
        <Button
          label="Logout"
          icon="pi pi-power-off"
          severity="danger"
          text
          onClick={logout}
        />
      </div>

      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <Card className="mb-2">
            <span className="block text-500 font-medium mb-3">Total Tasks</span>
            <div className="text-900 font-medium text-xl">{stats?.total}</div>
          </Card>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <Card className="mb-2 border-left-3 border-green-500">
            <span className="block text-500 font-medium mb-3">Completed</span>
            <div className="text-900 font-medium text-xl">
              {stats.completed}
            </div>
          </Card>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <Card className="mb-2 border-left-3 border-red-500">
            <span className="block text-500 font-medium mb-3">Pending</span>
            <div className="text-900 font-medium text-xl">{stats?.pending}</div>
          </Card>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <Card className="mb-2 border-left-3 border-yellow-500">
            <span className="block text-500 font-medium mb-3">In Progress</span>
            <div className="text-900 font-medium text-xl">
              {stats?.inProgress}
            </div>
          </Card>
        </div>

        <div className="col-12 lg:col-8">
          <Card title="My Tasks" className="h-full">
            <div className="mb-4">
              <TaskForm onAdd={addTask} />
            </div>
            {/* {loading == false ? (
              <div className="flex justify-content-center p-4">
                <i className="pi pi-spin pi-spinner text-4xl text-primary"></i>
              </div>
            ) : (
              <> */}
            <AITaskInput
              onCreated={(task) => {
                if (task) {
                  addLocalTask(task);
                } else {
                  loadTasks();
                }
              }}
            />
            <TaskList tasks={tasks} />
            {/* </>
            )} */}
          </Card>
        </div>

        <div className="col-12 lg:col-4">
          <Card
            title="Task Distribution"
            className="h-full flex flex-column align-items-center justify-content-center"
          >
            <Chart
              type="doughnut"
              data={chartData}
              options={chartOptions}
              className="w-full"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
