import { FC } from "react";
import { IconProps } from "./type";

export const HamburgerIcon: FC<IconProps> = ({
  size = 20,
  color = "currentColor",
  className = "text-gray-500 dark:text-gray-400",
}) => {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width={size}
      height={size * 0.8}
      fill={color}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      />
    </svg>
  );
};
