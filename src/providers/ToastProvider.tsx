import { type ReactNode } from "react";
import { toast, Toaster } from "sonner";
import { useLanguage } from "./LanguageProvider";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const { language } = useLanguage();

  return (
    <>
      {children}
      <Toaster
        position={language === "ar" ? "bottom-left" : "bottom-right"}
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
