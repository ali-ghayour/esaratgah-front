import { Col, Row } from "react-bootstrap";
import clsx from "clsx";
import { FileSelectionCell } from "./FileSelectionCell";
import { useFileManagerModal } from "../useFileManagerModal";
// import { FileActionCell } from "./FileActionCell";
import {
  useQueryResponse,
  useQueryResponseData,
} from "../core/QueryResponseProvider";
import { useEffect } from "react";

export const FilesList = () => {
  const uploadedFiles = useQueryResponseData();
  const { isLoading, refetch } = useQueryResponse();
  const { selectedFiles, setSelectedFiles, files, setFiles } =
    useFileManagerModal();
  const API_UPLOADS_URL = import.meta.env.VITE_APP_UPLOADS_URL;

  useEffect(() => {
    refetch();
    setFiles(uploadedFiles);
  }, [refetch, setFiles, uploadedFiles]);

  return (
    <Row className="pt-4 px-4">
      {!isLoading &&
        files.length > 0 &&
        files.map((file) => (
          <Col key={file._id} md={2} className="mb-8">
            <div
              className={clsx("card h-100 card-custom", {
                "selected-card": selectedFiles.includes(file),
              })}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest(".no-select")) return;
                setSelectedFiles?.([file]);
              }}
            >
              <div className="d-flex justify-content-center align-items-center mh-80px text-center">
                <img
                  src={`${API_UPLOADS_URL}${file.sizes?.small}`}
                  className="img img-fluid h-100 object-fit-cover "
                  alt="Preview"
                  style={{ objectFit: "cover" }} // Ensures image fills the card without distortion
                />
              </div>
              <FileSelectionCell file={file} />
              {/* <FileActionCell id={file._id} /> */}
            </div>
          </Col>
        ))}
    </Row>
  );
};
