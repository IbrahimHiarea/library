import { type ReactNode } from "react";
import { toast, Toaster } from "sonner";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <Toaster
        position="bottom-left"
        richColors
        toastOptions={{
          duration: 4000,
        }}
      />
    </>
  );
};

export const toastSuccess = (message: string) => {
  toast.success(message, {
    style: {
      background: "#4caf50",
      color: "#fff",
      border: "none",
    },
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    style: {
      background: "#f44336",
      color: "#fff",
      border: "none",
    },
  });
};
