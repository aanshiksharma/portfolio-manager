import { createContext, useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Toast from "./Toast";

export const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((heading, message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, heading, message, type, top }]);

    setTimeout(() => {
      removeToast(id);
    }, 10000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  });

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-[9999]">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
