import React, { createContext, useCallback } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export interface SwalOptions {
  title?: string;
  text?: string;
  icon?: "warning" | "error" | "success" | "info" | "question";
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
}

export interface SwalContextType {
  showSwal: (options: SwalOptions) => Promise<SweetAlertResult>;
}

export const SwalContext = createContext<SwalContextType | undefined>(
  undefined
);

export const SwalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const showSwal = useCallback(
    (options: SwalOptions): Promise<SweetAlertResult> => {
      return MySwal.fire({
        title: options.title || "Are you sure?",
        text: options.text || "Do you want to proceed?",
        icon: options.icon || "warning",
        showCancelButton: options.showCancelButton ?? true,
        confirmButtonColor: options.confirmButtonColor || "#d33",
        cancelButtonColor: options.cancelButtonColor || "#3085d6",
        confirmButtonText: options.confirmButtonText || "Yes",
        cancelButtonText: options.cancelButtonText || "Cancel",
      });
    },
    []
  );

  return (
    <SwalContext.Provider value={{ showSwal }}>{children}</SwalContext.Provider>
  );
};
