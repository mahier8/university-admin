// contexts/ToastContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toast } from "../components/molecules/Toast";

type ToastMessage = { id: number; message: string };

type ToastContextType = {
  showToast: (msg: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0; // simple ID generator

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (msg: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message: msg }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} onClose={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))} />
        ))}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};