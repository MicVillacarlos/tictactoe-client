"use client"
import React, { useCallback, useContext, useState } from "react";
import { createContext } from "react";
import Toast from "../../../components/Atoms/toasts/Toast";

interface ToastProps {
  message: string;
  type: "success" | "danger" | "warning" | "";
  isShow: boolean;
}

interface ToastContextProps {
  showToast: (message: string, type: "success" | "danger" | "warning", seconds?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastProps>({
    message: "",
    type: "",
    isShow: false,
  });

  const showToast = useCallback(
    (message: string, type: "success" | "danger" | "warning", seconds: number = 3) => {
      setToast({ message, type, isShow: true });

      setTimeout(() => {
        setToast((prev) => ({ ...prev, isShow: false }));
      }, seconds * 1000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={toast.message} type={toast.type} isShow={toast.isShow} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};
