import React, { FC } from "react";
import { IconProps } from "./type";

export const CheckIcon: FC<IconProps> = ({
  size = 20,
  color = "currentColor",
  className = "text-gray-500 dark:text-gray-400",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
      className={className}
    >
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  );
};
