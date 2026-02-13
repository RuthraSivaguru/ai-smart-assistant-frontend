import { useCalendarStore } from "../../../store/calendar.store";

export const useCalendar = () => {
  const { currentDate, setCurrentDate } = useCalendarStore();

  const prevMonth = () => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    setCurrentDate(date);
  };

  const nextMonth = () => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    setCurrentDate(date);
  };

  return {
    prevMonth,
    nextMonth,
  };
};
