import { FC } from "react";
import { IconProps } from "./type";

export const NextIcon: FC<IconProps> = ({
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
        stroke={color ?? "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 9 4-4-4-4"
      />
    </svg>
  );
};
