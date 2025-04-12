import React from "react";

type SecondaryButtonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
  width?: string;
  onClick?: () => void;
};

const SecondaryButton = (props: SecondaryButtonProps) => {
  const { type, children, width, onClick } = props;
  return (
    <button
      type={type}
      className={`flex items-center justify-center text-[#205072] border border-[#205072] hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-base px-5 py-2.5 ${
        width ?? "w-full"
      } cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
