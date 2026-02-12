import { useState } from "react";
import { useTasks } from "../../tasks/hooks/useTask";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import styles from "../../../styles/features/calendar/Calendar.module.css";

export default function CalendarPage() {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getTasksForDay = (day: number) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const d = new Date(task.dueDate);
      return (
        d.getDate() === day &&
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    });
  };

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const days = Array.from(
    { length: daysInMonth(year, month) },
    (_, i) => i + 1,
  );
  const paddingDays = Array.from(
    { length: firstDayOfMonth(year, month) },
    (_, i) => i,
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    show: { opacity: 1, scale: 1, y: 0 },
  };

  const renderListView = () => {
    const scheduledDays = days.filter((d) => getTasksForDay(d).length > 0);

    if (scheduledDays.length === 0) {
      return (
        <div className="flex flex-column align-items-center justify-content-center py-8 gap-3">
          <i className="pi pi-calendar-times text-4xl text-200"></i>
          <span className="text-600 font-medium italic">
            No tasks scheduled for {monthName}
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-column gap-4">
        {scheduledDays.map((day) => {
          const dayTasks = getTasksForDay(day);
          const isToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-4 p-4 border-round-2xl transition-all duration-200 ${isToday ? "bg-primary-50 border-left-3 border-primary shadow-1" : "bg-white hover:surface-50"}`}
            >
              <div className="flex flex-column align-items-center justify-content-center min-w-4rem">
                <span className="text-sm font-bold text-500 uppercase">
                  {new Date(year, month, day).toLocaleString("default", {
                    weekday: "short",
                  })}
                </span>
                <span
                  className={`text-3xl font-black ${isToday ? "text-primary" : "text-900"}`}
                >
                  {day}
                </span>
              </div>

              <div className="flex-1 flex flex-column gap-3">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex align-items-center justify-content-between p-3 border-round-xl border-1 border-50 bg-white shadow-none hover:shadow-2 transition-all"
                  >
                    <div className="flex flex-column gap-1">
                      <span className="font-bold text-900">{task.title}</span>
                      <span className="text-500 text-sm overflow-hidden text-overflow-ellipsis">
                        {task.description}
                      </span>
                    </div>
                    <Tag
                      value={task.status.replace("_", " ")}
                      severity={
                        task.status === "completed"
                          ? "success"
                          : task.status === "in_progress"
                            ? "warning"
                            : "danger"
                      }
                      rounded
                      className="px-3"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex align-items-center justify-content-between mb-6"
      >
        <div className="flex flex-column gap-1">
          <h1 className="text-4xl font-bold text-900 m-0">Calendar</h1>
          <p className="text-600 font-medium">
            Schedule and manage tasks by date
          </p>
        </div>

        <div className="flex align-items-center gap-4">
          <div className="flex bg-white p-1 border-round-xl shadow-1">
            <Button
              icon="pi pi-bars"
              label="List"
              text={viewType !== "list"}
              onClick={() => setViewType("list")}
              className={`px-3 py-2 border-round-lg transition-all ${viewType === "list" ? "bg-primary text-black" : "text-600"}`}
            />
            <Button
              icon="pi pi-th-large"
              label="Grid"
              text={viewType !== "grid"}
              onClick={() => setViewType("grid")}
              className={`px-3 py-2 border-round-lg transition-all ${viewType === "grid" ? "bg-primary text-black" : "text-600"}`}
            />
          </div>

          <div className="flex align-items-center gap-3 bg-white p-2 border-round-xl shadow-1">
            <Button
              icon="pi pi-chevron-left"
              text
              onClick={prevMonth}
              rounded
            />
            <span className="text-xl font-bold text-900 min-w-8rem text-center">
              {monthName} {year}
            </span>
            <Button
              icon="pi pi-chevron-right"
              text
              onClick={nextMonth}
              rounded
            />
          </div>
        </div>
      </motion.div>

      <div
        className={`surface-card p-4 border-round-2xl shadow-1 overflow-hidden ${styles.calendarContainer}`}
      >
        <div className={styles.gridHeader}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        {viewType === "grid" ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={styles.gridBody}
          >
            {paddingDays.map((i) => (
              <div key={`pad-${i}`} className={styles.paddingDay}></div>
            ))}
            {days.map((day) => {
              const dayTasks = getTasksForDay(day);
              const isToday =
                day === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();

              return (
                <motion.div
                  key={day}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    zIndex: 10,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  className={`relative p-3 cursor-pointer transition-colors duration-300 ${isToday ? styles.dayCellToday : styles.dayCell}`}
                >
                  <div className="flex justify-content-between align-items-start">
                    <span
                      className={`text-2xl font-black tracking-tighter ${
                        isToday ? "text-primary" : "text-900"
                      } ${isToday ? styles.dayNumberToday : styles.dayNumber}`}
                    >
                      {day}
                    </span>
                    {dayTasks.length > 0 && (
                      <div className="flex gap-1">
                        <span
                          className={`w-8px h-8px border-circle bg-primary shadow-2 animate-pulse ${styles.dotIndicator}`}
                        ></span>
                      </div>
                    )}
                  </div>

                  <div className="mt-2 flex flex-column gap-2 overflow-hidden">
                    {dayTasks.slice(0, 3).map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-xs p-2 border-round-lg font-bold white-space-nowrap overflow-hidden text-overflow-ellipsis ${task.status === "completed" ? styles.taskItemCompleted : styles.taskItem}`}
                      >
                        {task.title}
                      </motion.div>
                    ))}
                    {dayTasks.length > 3 && (
                      <span className="text-xs text-500 font-bold pl-1">
                        +{dayTasks.length - 3} others
                      </span>
                    )}
                  </div>

                  {isToday && (
                    <div
                      className={`absolute bottom-0 left-0 w-full h-4px bg-primary ${styles.todayIndicator}`}
                    ></div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          renderListView()
        )}
      </div>
    </div>
  );
}
