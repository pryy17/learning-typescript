import React, { ComponentProps, FC, ButtonHTMLAttributes } from "react";

type ContainerProps = ButtonHTMLAttributes<"button"> & {
  text: string;
  typeColor: string;
  eventClick: () => void;
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

const Button: FC<ContainerProps> = ({ className, eventClick, ...props }) => {
  const {
    text = "button",
    typeColor = "primary",
    type = "submit",
    disabled = false,
  } = props;

  return (
    <button
      onClick={eventClick}
      disabled={disabled}
      className={`${
        typeColor === "danger" ? buttonColor.danger : buttonColor.primary
      } ${
        props?.disabled && buttonColor.disabled
      } py-3 px-7 mx-3 rounded-md text-white ${className} font-medium`}
      type={type}
    >
      <p>{text}</p>
    </button>
  );
};

export default Button;
