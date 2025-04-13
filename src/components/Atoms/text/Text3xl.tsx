import clsx from "clsx";
import React from "react";

const Text3xl = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) => {
  return (
    <p
      className={clsx(
        "font-extrabold leading-none tracking-tight text-3xl align-center",
        color ? color : " text-gray-900"
      )}
    >
      {children}
    </p>
  );
};

export default Text3xl;
