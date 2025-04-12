import React from "react";

const Text2xl = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="font-extrabold leading-none tracking-tight text-gray-900 text-2xl align-center">
      {children}
    </p>
  );
};

export default Text2xl;
