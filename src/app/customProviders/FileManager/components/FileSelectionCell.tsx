import { FC } from "react";
import clsx from "clsx";
import { useFileManagerModal } from "../useFileManagerModal";
import { File } from "../core/_models";

type Props = {
  file : File
};

const FileSelectionCell: FC<Props> = ({ file }) => {
  const { selectedFiles , toggleFileSelection} = useFileManagerModal()
  return (
    <div
      className={clsx(
        "form-check position-absolute top-0 start-0 z-index-1 m-2",
        { " hover-checkbox-custom": selectedFiles.length === 0 }
      )}
      style={{ zIndex: 2 }}
    >
      <input
        type="hidden"
        // className="form-check-input"
        // checked={selectedFiles.some((f) => f._id === file._id)}
        onChange={() => toggleFileSelection(file)}
        onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the card container
      />
    </div>
  );
};

export { FileSelectionCell };
