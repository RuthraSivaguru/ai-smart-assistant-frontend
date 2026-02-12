import { InputText, type InputTextProps } from "primereact/inputtext";
import { classNames } from "primereact/utils";

interface CustomInputProps extends InputTextProps {
  label?: string;
  containerClassName?: string;
}

export const CustomInput = ({
  label,
  className,
  containerClassName,
  id,
  ...props
}: CustomInputProps) => {
  return (
    <div className={classNames("flex flex-column gap-2", containerClassName)}>
      {label && (
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
      )}
      <InputText
        id={id}
        className={classNames("w-full", className)}
        {...props}
      />
    </div>
  );
};
