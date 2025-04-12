import React from "react";
import Textxl from "../text/TextLarge";

interface TextInputProps {
  id: string;
  label?: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string;
}

const TextInput = ({
  label,
  placeholder,
  id,
  handleChange,
  required = false,
  value,
}: TextInputProps) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        <Textxl>{label}</Textxl>
      </label>
      <div className="relative flex items-center border border-gray-300 rounded-lg focus-within:ring-blue-500 focus-within:border-[#205072]">
        <input
          onChange={handleChange}
          type="text"
          id={id}
          value={value}
          placeholder={placeholder}
          required={required}
          className="w-full p-2.5 text-sm text-gray-900 border-none outline-none focus:ring-0 focus:border-none rounded-lg"
        />
      </div>
    </div>
  );
};

export default TextInput;
