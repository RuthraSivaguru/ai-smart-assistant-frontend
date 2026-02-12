import { Dropdown, type DropdownProps } from "primereact/dropdown";
import { classNames } from "primereact/utils";

interface CustomDropdownProps extends DropdownProps {
  label?: string;
  containerClassName?: string;
}

export const CustomDropdown = ({
  label,
  className,
  containerClassName,
  id,
  ...props
}: CustomDropdownProps) => {
  return (
    <div className={classNames("flex flex-column gap-2", containerClassName)}>
      {label && (
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
      )}
      <Dropdown
        id={id}
        className={classNames("w-full", className)}
        {...props}
      />
    </div>
  );
};
