import { useContext } from "react";
import { FileManagerContext } from "./FileManagerProvider";

export const useFileManagerModal = () => {
  const context = useContext(FileManagerContext);
  if (!context) {
    throw new Error("useFileManager must be used within FileManagerProvider");
  }
  return context;
};
