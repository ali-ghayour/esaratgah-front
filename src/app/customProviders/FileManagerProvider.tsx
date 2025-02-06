import React, { createContext, useState, ReactNode } from "react";
import { Modal, Button, Spinner, Form, Alert } from "react-bootstrap";
import { getFiles } from "../modules/apps/file-management/content/core/_requests";
import { File } from "../modules/apps/file-management/content/core/_models";

interface FileManagerContextProps {
  openModal: (onSelect: (files: File[]) => void, multiple?: boolean) => void;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = (onSelect: (files: File[]) => void, multiple = true) => {
    setShowModal(true);
    setOnSelectCallback(() => onSelect);
    setMultipleSelection(multiple);
    fetchFiles();
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

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFiles(""); // Pass query string if needed
      setFiles(response?.data || []);
    } catch (err) {
      setError("Failed to fetch files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FileManagerContext.Provider value={{ openModal }}>
      {children}

      {/* File Manager Modal */}
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>File Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" />
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && !error && files.length > 0 && (
            <div className="file-list">
              {files.map((file) => (
                <div key={file._id} className="d-flex align-items-center mb-2">
                  <Form.Check
                    type={multipleSelection ? "checkbox" : "radio"}
                    label={`${file.originalName} (${file.size} bytes)`}
                    checked={selectedFiles.some((f) => f._id === file._id)}
                    onChange={() => toggleFileSelection(file)}
                  />
                </div>
              ))}
            </div>
          )}

          {!loading && !error && files.length === 0 && (
            <p className="text-muted text-center">No files available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSelectFiles}>
            Select Files
          </Button>
        </Modal.Footer>
      </Modal>
    </FileManagerContext.Provider>
  );
};
