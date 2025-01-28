import { useContext } from "react";
import { SwalContext, SwalContextType } from "./SwalProvider";

export const useSwal = (): SwalContextType => {
  const context = useContext(SwalContext);
  if (!context) {
    throw new Error("useSwal must be used within a SwalProvider");
  }
  return context;
};
