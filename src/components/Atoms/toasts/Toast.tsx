import React from "react";

import CloseIcon from "../../svg/CloseIcon";
import { capitalizeFirstLetter } from "../../../lib/helpers/helpers";
import { WarningIcon } from "../../svg/WarningIcon";
import { CheckIcon } from "../../svg/CheckIcon";

interface ToastProps {
  message: string;
  type: "success" | "danger" | "warning" | "";
  isShow: boolean;
}

const Toast = ({ message, type, isShow }: ToastProps) => {
  const icon = (() => {
    switch (type) {
      case "success":
        return <CheckIcon color="white" />;
      case "danger":
        return <CloseIcon size={12} className="text-white" />;
      case "warning":
        return <WarningIcon size={20} color="white" />;
      default:
        return null;
    }
  })();

  const toastClasses = {
    success: "bg-green-200 text-green-700",
    danger: "bg-red-200 text-red-700",
    warning: "bg-orange-200 text-orange-700",
    "": "",
  };

  const iconBgClasses = {
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white",
    warning: "bg-orange-500 text-white",
    "": "",
  };

  return isShow ? (
    <div
      id={`toast-${type}`}
      className={`fixed top-4 right-4 z-50 flex flex-col w-full max-w-xs p-4 mb-4 rounded-lg shadow-lg ${toastClasses[type]}`}
      role="alert"
    >
      <div className="flex items-center">
        <div
          className={`inline-flex items-center justify-center shrink-0 w-6 h-6 rounded-lg ${iconBgClasses[type]}`}
        >
          {icon}
        </div>
        <div className="ms-3 text-sm font-normal font-semibold">
          {type === "danger" ? "Error" : capitalizeFirstLetter(type)}
        </div>
      </div>
      <hr className={`h-px my-3 ${iconBgClasses[type]} border-0`}></hr>
      <div className="text-sm font-normal mx-1">{message}</div>
    </div>
  ) : null;
};

export default Toast;
