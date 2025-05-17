"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast } from "radix-ui";
import "./styles.css";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";

type ColorType = "success" | "info" | "warning" | "error";

type ToastData = {
  title: string;
  description?: string;
  color: ColorType;
  duration?: number;
};

type ToastContextType = {
  showToast: (data: ToastData) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [toastData, setToastData] = useState<ToastData>({
    title: "",
    description: "",
    color: "info",
    duration: 4000,
  });

  const showToast = useCallback((data: ToastData) => {
    setToastData(data);
    setOpen(false); // force reset in case toast is already open
    requestAnimationFrame(() => setOpen(true));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider swipeDirection="right">
        {children}
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className="ToastRoot"
          duration={toastData.duration}
        >
          <span
            className="flex items-center gap-1 ToastTitle"
            style={{ color: getColor(toastData.color) }}
          >
            {getIcon(toastData.color)}
            <span>{toastData.title}</span>
          </span>
          {toastData.description && (
            <Toast.Description className="ToastDescription">
              {toastData.description}
            </Toast.Description>
          )}
          <Toast.Action className="ToastAction" asChild altText="Close">
            <button className="Button small green">
              <X size={16} />
            </button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

const getColor = (color: ColorType) => {
  switch (color) {
    case "success":
      return "#52c41a";
    case "info":
      return "#1677ff";
    case "warning":
      return "#faad14";
    case "error":
      return "#ff4d4f";
  }
};

const getIcon = (color: ColorType) => {
  switch (color) {
    case "success":
      return <CheckCircle size={16} />;
    case "info":
      return <Info size={16} />;
    case "warning":
      return <AlertTriangle size={16} />;
    case "error":
      return <AlertCircle size={16} />;
  }
};
