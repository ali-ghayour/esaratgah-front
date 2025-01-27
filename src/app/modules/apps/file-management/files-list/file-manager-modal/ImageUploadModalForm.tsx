import { useState } from "react";
import { useListView } from "../core/ListViewProvider";
import { useQueryResponse } from "../core/QueryResponseProvider";
import { useCallback } from "react";
import { useDropzone, FileRejection, Accept } from "react-dropzone";
import { uploadFile } from "../core/_requests";

interface UploadedFile extends File {
  preview: string;
}

const ImageUploadModalForm = () => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Map accepted files with preview URLs
      const mappedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      // Handle rejected files (optional)
      if (fileRejections.length > 0) {
        console.error("Rejected files:", fileRejections);
      }

      setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
    },
    []
  );

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const clearAll = () => setFiles([]);

  const handleUpload = async () => {
    try {
      await uploadFile(files);
      clearAll();
      refetch();
      setItemIdForUpdate(undefined);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/gif": [] } as Accept,
    maxSize: 5 * 1024 * 1024, // 5MB size limit
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`modal-body text-center p-4 border ${
          isDragActive ? "border-primary" : "border-secondary"
        } border-dashed`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-primary">Drop the files here...</p>
        ) : (
          <p className="text-muted">
            Drag and drop files here, or click to select files
          </p>
        )}
        <small className="text-muted">
          (Only JPEG, PNG, and GIF files are accepted. Max size: 5MB)
        </small>
      </div>

      {/* File Previews */}
      {files.length > 0 && (
        <div className="modal-body">
          <h6 className="font-weight-semibold mb-2">Uploaded Files</h6>
          <div className="row">
            {files.map((file) => (
              <div
                key={file.name + Math.random() * 1000}
                className="col-6 mb-2"
              >
                <div className="position-relative">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="img-fluid rounded"
                  />
                  <button
                    onClick={() => removeFile(file.name)}
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                  >
                    <span>&times;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={clearAll} className="btn btn-danger mt-3 w-100">
            Clear All
          </button>
          <button onClick={handleUpload} className="btn btn-success mt-3 w-100">
            Upload Files
          </button>
        </div>
      )}
    </>
  );
};

export { ImageUploadModalForm };
