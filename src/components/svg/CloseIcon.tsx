import React, { FC } from "react";
import { IconProps } from "./type";

const CloseIcon: FC<IconProps> = ({
  size = 20,
  color = "currentColor",
  className = "text-gray-500",
}) => {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width={size}
      height={size * 0.8}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
      />
    </svg>
  );
};

export default CloseIcon;
