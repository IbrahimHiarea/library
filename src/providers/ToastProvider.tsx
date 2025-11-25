import { type ReactNode } from "react";
import { Toaster } from "sonner";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          duration: 4000,
        }}
      />
    </>
  );
};
