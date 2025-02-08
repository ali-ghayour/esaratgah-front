import { useListView } from "../core/ListViewProvider";
import { useQueryResponse } from "../core/QueryResponseProvider";
import { useDropzone, FileRejection, Accept } from "react-dropzone";
import { uploadFile } from "../core/_requests";

export const DropZone = () => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      setTimeout(() => {
        refetch();
      }, 2000); // Adjust delay based on your server's response time
    }
    setItemIdForUpdate(undefined);
  };

  const handleUpload = async (uploadedFiles: File[]) => {
    try {
      await uploadFile(uploadedFiles);
      cancel(true);
    } catch (ex) {
      console.error(ex);
    } finally {
      cancel(true);
    }
  };

  const onDrop = async (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => {
    if (fileRejections.length > 0) {
      console.error("Rejected files:", fileRejections);
    }
    if (acceptedFiles.length > 0) {
      handleUpload(acceptedFiles);
    }
    return acceptedFiles;
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
    </>
  );
};
