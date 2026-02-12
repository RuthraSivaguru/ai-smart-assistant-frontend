import {
  InputTextarea,
  type InputTextareaProps,
} from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

interface CustomTextareaProps extends InputTextareaProps {
  label?: string;
  containerClassName?: string;
}

export const CustomTextarea = ({
  label,
  className,
  containerClassName,
  id,
  ...props
}: CustomTextareaProps) => {
  return (
    <div className={classNames("flex flex-column gap-2", containerClassName)}>
      {label && (
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
      )}
      <InputTextarea
        id={id}
        className={classNames("w-full", className)}
        {...props}
      />
    </div>
  );
};
