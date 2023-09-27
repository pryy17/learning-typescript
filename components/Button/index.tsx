import React, { ComponentProps, FC } from "react";

type ContainerProps = ComponentProps<"div"> & {
  text: string;
  typeColor: string;
};

const buttonColor: {
  primary: string;
  disabled: string;
  danger: string;
} = {
  primary: "bg-[#808691] ",
  disabled: "bg-[#808691]  opacity-30 ",
  danger: "bg-red-500",
};

const Button: FC<ContainerProps> = ({ className, ...props }) => {
  const { text = "button", typeColor = "primary" } = props;

  return (
    <button
      {...props}
      className={`${
        typeColor === "danger" ? buttonColor.danger : buttonColor.primary
      } ${
        props?.disabled && buttonColor.disabled
      } py-3 px-7 mx-3 rounded-md text-white ${className} font-medium`}
      type="submit"
    >
      <p>{text}</p>
    </button>
  );
};

export default Button;
