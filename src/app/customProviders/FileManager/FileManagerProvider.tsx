import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { File } from "../../modules/apps/file-management/content/core/_models";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { ListViewProvider } from "./core/ListViewProvider";
import "./assets/style.css";
import { FileManagerModal } from "./FileManagerModal";

interface FileManagerContextProps {
  openModal: (onSelect: (files: File[]) => void, multiple?: boolean) => void;
  showModal: boolean;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  multipleSelection: boolean;
  selectedFiles: File[];
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
  setMultipleSelection: Dispatch<SetStateAction<boolean>>;
  handleSelectFiles: () => void;
  toggleFileSelection: (file: File) => void;
  handleClose: () => void;
}

export const FileManagerContext = createContext<
  FileManagerContextProps | undefined
>(undefined);

export const FileManagerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [onSelectCallback, setOnSelectCallback] = useState<
    ((files: File[]) => void) | null
  >(null);
  const [multipleSelection, setMultipleSelection] = useState(true);

  const openModal = (onSelect: (files: File[]) => void, multiple = true) => {
    setShowModal(true);
    setOnSelectCallback(() => onSelect);
    setMultipleSelection(multiple);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFiles([]);
  };

  const handleSelectFiles = () => {
    if (onSelectCallback) {
      const result = multipleSelection
        ? selectedFiles
        : selectedFiles.slice(0, 1);
      onSelectCallback(result);
    }
    handleClose();
  };

  const toggleFileSelection = (file: File) => {
    if (multipleSelection) {
      setSelectedFiles((prev) =>
        prev.find((f) => f._id === file._id)
          ? prev.filter((f) => f._id !== file._id)
          : [...prev, file]
      );
    } else {
      setSelectedFiles([file]);
    }
  };

  return (
    <FileManagerContext.Provider
      value={{
        openModal,
        showModal,
        files,
        setFiles,
        selectedFiles,
        setSelectedFiles,
        multipleSelection,
        setMultipleSelection,
        handleSelectFiles,
        toggleFileSelection,
        handleClose,
      }}
    >
      <QueryRequestProvider>
        <QueryResponseProvider>
          <ListViewProvider>
            {children}
            <FileManagerModal />
          </ListViewProvider>
        </QueryResponseProvider>
      </QueryRequestProvider>
    </FileManagerContext.Provider>
  );
};
