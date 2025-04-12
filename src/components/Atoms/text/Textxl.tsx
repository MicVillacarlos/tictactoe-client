import React from "react";

const Textxl = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="font-extrabold leading-none tracking-tight text-gray-900 text-xl align-center">
      {children}
    </p>
  );
};

export default Textxl;
