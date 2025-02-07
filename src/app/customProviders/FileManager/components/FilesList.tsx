import { Col, Row } from "react-bootstrap";
import clsx from "clsx";
import { FileSelectionCell } from "./FileSelectionCell";
import { useFileManagerModal } from "../useFileManagerModal";
// import { FileActionCell } from "./FileActionCell";
import {
  useQueryResponse,
  useQueryResponseData,
} from "../core/QueryResponseProvider";

export const FilesList = () => {
  const files = useQueryResponseData();
  const { isLoading } = useQueryResponse();
  const { selectedFiles, setSelectedFiles } = useFileManagerModal();
  // const isSelected = useMemo(() => selected.includes(id), [id, selected]);
  const API_UPLOADS_URL = import.meta.env.VITE_APP_UPLOADS_URL;
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
              //   style={{ cursor: "pointer", height: "200px", width: "150px" }} // Fixed card dimensions
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

          //   <Col key={file._id} md={2} className="mb-8">
          //     <div
          //       className={clsx(
          //         "card h-100 card-custom",
          //         { "selected-card": selectedFiles.includes(file) } // Optional styling for selected state
          //       )}
          //       onClick={(e) => {
          //         // Prevent selection if clicking on child elements with specific roles
          //         const target = e.target as HTMLElement;
          //         if (
          //           target.closest(".no-select") // Prevent selection for elements with this class
          //         ) {
          //           return;
          //         }
          //         setSelectedFiles?.([file]); // Your selection logic
          //       }}
          //       // onClick={() => onSelect?.(file._id)} // Toggle selection when the card is clicked
          //       style={{ cursor: "pointer" }}
          //     >
          //       <div className="d-flex justify-content-center align-items-center">
          //         {/* <div className=""> */}
          //         <img
          //           src={`${API_UPLOADS_URL}${file.sizes?.medium}`}
          //           className="theme-light-show img img-fluid"
          //           //   alt={blankImg}
          //         />
          //         <img
          //           src={`${API_UPLOADS_URL}${file.fileName}`}
          //           className="theme-dark-show"
          //           //   alt={blankImg}
          //         />
          //         {/* </div> */}
          //       </div>
          //       {/* <div>
          //         <img
          //           className="img-fluid p-2"
          //           src={API_UPLOADS_URL + file.sizes?.small}
          //           alt=""
          //         />
          //       </div> */}
          //       <FileSelectionCell file={file} />
          //       <FileActionCell id={file._id} />
          //     </div>
          //   </Col>
        ))}
    </Row>
  );
};
