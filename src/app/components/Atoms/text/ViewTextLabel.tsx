import React from "react";

const ViewTextLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="font-semibold tracking-tight text-gray-900 text-base align-center">
      {children}
    </h1>
  );
};

export default ViewTextLabel;
