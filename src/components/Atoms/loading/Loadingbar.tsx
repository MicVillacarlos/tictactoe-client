import React from "react";
import clsx from "clsx";

interface LoadingbarProps {
  color?: string;
}

const Loadingbar: React.FC<LoadingbarProps> = ({ color }) => {
  return (
    <div className={clsx("animate-pulse h-9 rounded", color || "bg-gray-300")} />
  );
};

export default Loadingbar;
