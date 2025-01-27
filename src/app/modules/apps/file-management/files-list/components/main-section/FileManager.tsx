import {
  useQueryResponseData,
  useQueryResponseLoading,
} from "../../core/QueryResponseProvider";
import { Col, Row } from "react-bootstrap";
import { FilesListLoading } from "./components/loading/FilesListLoading";
import { FilesListPagination } from "./components/pagination/FilesListPagination";
import { KTCardBody } from "../../../../../../../_metronic/helpers";
import { toAbsoluteUrl } from "../../../../../../../_metronic/helpers";
import { formatFileSize } from "../../../../../../helpers/formatFileSize";
import { FileSelectionCell } from "./components/cells/FileSelectionCell";
import { FileActionCell } from "./components/cells/FileActionCell";

const FileManager = () => {
  const files = useQueryResponseData();
  const isLoading = useQueryResponseLoading();
  const API_UPLOADS_URL = import.meta.env.VITE_APP_UPLOADS_URL;
  const blankImg = toAbsoluteUrl("media/svg/avatars/blank.svg");

  return (
    <KTCardBody className="py-4">
      <div className="table-responsive">
        <Row className="pt-4 px-4">
          {files.map((file) => (
            <Col key={file._id} md={2} className="mb-8">
              <div className="card h-100 card-custom">
                <FileSelectionCell id={file._id} />
                <FileActionCell id={file._id} />
                <div className="card-body d-flex justify-content-center text-center flex-column p-8">
                  <a
                    href={`${API_UPLOADS_URL}/${file.fileName}`}
                    className="text-gray-800 text-hover-primary d-flex flex-column"
                  >
                    <div className="symbol symbol-60px mb-5">
                      <img
                        src={`${API_UPLOADS_URL}/${file.fileName}`}
                        className="theme-light-show"
                        alt={blankImg}
                      />
                      <img
                        src={`${API_UPLOADS_URL}/${file.fileName}`}
                        className="theme-dark-show"
                        alt={blankImg}
                      />
                    </div>
                    <div className="fs-5 fw-bold mb-2">{file.originalName}</div>
                  </a>
                  <div className="fs-7 fw-semibold text-gray-500">
                    {formatFileSize(file.size)}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <FilesListPagination />
      {isLoading && <FilesListLoading />}
    </KTCardBody>
  );
};

export { FileManager };
