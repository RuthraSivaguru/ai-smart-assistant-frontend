import { Button, type ButtonProps } from "primereact/button";

interface CustomButtonProps extends ButtonProps {}

export const CustomButton = (props: CustomButtonProps) => {
  return <Button {...props} />;
};
