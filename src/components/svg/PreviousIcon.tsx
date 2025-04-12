import { FC } from "react";
import { IconProps } from "./type";

export const PreviousIcon: FC<IconProps> = ({
  size,
  color,
  className = "w-2.5 h-2.5 rtl:rotate-180",
}) => {
  return (
    <svg
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill={color ?? "none"}
      height={size}
      width={size}
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 1 1 5l4 4"
      />
    </svg>
  );
};
