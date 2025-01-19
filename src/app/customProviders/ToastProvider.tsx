import { FC, useState, createContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { WithChildren } from "../../_metronic/helpers";

type ToastType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "danger"
  | "light-success"
  | "light-error"
  | "light-info"
  | "light-warning"
  | "light-danger";

type ToastOptions = {
  id?: string; // Optional unique ID for each toast
  title?: string;
  message: string;
  type?: ToastType;
  autoHide?: number; // Duration in milliseconds
  showEasing?: string;
};

type ToastContextType = {
  addToast: (toast: ToastOptions) => void;
  removeToast: (id: string) => void;
};

const initAuthContextPropsState = {
  addToast: () => {},
  removeToast: () => {},
};

const ToastContext = createContext<ToastContextType>(initAuthContextPropsState);

let toastCounter = 0; // Unique ID generator for toasts

const ToastProvider: FC<WithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const addToast = (toast: ToastOptions) => {
    const id = toast.id || `toast-${++toastCounter}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    if (toast.autoHide) {
      setTimeout(() => removeToast(id), toast.autoHide);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer position="top-end" className="p-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            onClose={() => removeToast(toast.id!)}
            bg={toast.type}
            autohide={!!toast.autoHide}
            delay={toast.autoHide}
          >
            {toast.title && (
              <Toast.Header>
                <strong className="me-auto">{toast.title}</strong>
              </Toast.Header>
            )}
            <Toast.Body>{toast.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
