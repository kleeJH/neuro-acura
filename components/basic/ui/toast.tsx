"use client";

import { useState } from "react";
import { Toast } from "radix-ui";

interface ToastProps {
  title: string;
  type?: "success" | "error" | "warning" | "info";
  variant?: "soft" | "surface" | "outline";
  size?: "1" | "2" | "3";
}

const CustomToast = ({
  title,
  type = "info",
  variant = "surface",
  size = "2",
}: ToastProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={open}
        onOpenChange={() => setOpen(true)}
        duration={3000}
      >
        <Toast.Title>{title}</Toast.Title>
        <Toast.Description asChild>Test description</Toast.Description>
        <Toast.Close />
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
};

export default CustomToast;
