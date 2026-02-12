import { Calendar, type CalendarProps } from "primereact/calendar";
import { classNames } from "primereact/utils";

interface CustomCalendarProps extends CalendarProps {
  label?: string;
  containerClassName?: string;
}

export const CustomCalendar = ({
  label,
  className,
  containerClassName,
  id,
  ...props
}: CustomCalendarProps) => {
  return (
    <div className={classNames("flex flex-column gap-2", containerClassName)}>
      {label && (
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
      )}
      <Calendar
        id={id}
        className={classNames("w-full", className)}
        {...props}
      />
    </div>
  );
};
