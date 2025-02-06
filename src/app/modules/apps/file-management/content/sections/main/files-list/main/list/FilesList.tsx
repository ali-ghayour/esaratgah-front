import clsx from "clsx";
import { Row, Col } from "react-bootstrap";
import { FileSelectionCell } from "./components/FileSelectionCell";
import { FileActionCell } from "./components/FileActionCell";
import { formatFileSize } from "../../../../../../../../../helpers/formatFileSize";
import { useQueryResponseData } from "../../../../../core/QueryResponseProvider";
import { useListView } from "../../../../../core/ListViewProvider";
import { toAbsoluteUrl } from "../../../../../../../../../../_metronic/helpers";

export const FilesList = () => {
  const files = useQueryResponseData();
  const { selected, onSelect } = useListView();
  // const isSelected = useMemo(() => selected.includes(id), [id, selected]);
  const API_UPLOADS_URL = import.meta.env.VITE_APP_UPLOADS_URL;
  const blankImg = toAbsoluteUrl("media/svg/avatars/blank.svg");
  return (
    <Row className="pt-4 px-4">
      {files.map((file) => (
        <Col key={file._id} md={2} className="mb-8">
          <div
            className={clsx(
              "card h-100 card-custom",
              { "selected-card": selected.includes(file._id) } // Optional styling for selected state
            )}
            onClick={(e) => {
              // Prevent selection if clicking on child elements with specific roles
              const target = e.target as HTMLElement;
              if (
                target.closest(".no-select") // Prevent selection for elements with this class
              ) {
                return;
              }
              onSelect?.(file._id); // Your selection logic
            }}
            // onClick={() => onSelect?.(file._id)} // Toggle selection when the card is clicked
            style={{ cursor: "pointer" }}
          >
            <FileSelectionCell id={file._id} />
            <FileActionCell id={file._id} />
            <div className="card-body d-flex justify-content-center text-center flex-column p-8">
              <a
                target="_blank"
                href={`${API_UPLOADS_URL}${file.fileName}`}
                className="text-gray-800 text-hover-primary d-flex flex-column no-select"
              >
                <div className="symbol symbol-70px mb-5">
                  <img
                    src={`${API_UPLOADS_URL}${file.sizes?.medium}`}
                    className="theme-light-show"
                    alt={blankImg}
                  />
                  <img
                    src={`${API_UPLOADS_URL}${file.fileName}`}
                    className="theme-dark-show"
                    alt={blankImg}
                  />
                </div>
                <div className="fs-8 fw-bold mb-2">{file.originalName}</div>
              </a>
              <div className="fs-9 fw-semibold text-gray-500">
                {formatFileSize(file.size)}
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};
