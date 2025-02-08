import { Modal, Button, Container, Row } from "react-bootstrap";
import { DropZone } from "./components/DropZone";
import { FilesList } from "./components/FilesList";
import { FilesListPagination } from "./components/FilesListPagination";
import { useFileManagerModal } from "./useFileManagerModal";
import { useQueryResponseLoading } from "./core/QueryResponseProvider";
import { FilesListLoading } from "./components/FilesListLoading";
export const FileManagerModal = () => {
  const { showModal, handleClose, handleSelectFiles } = useFileManagerModal();
  const isLoading = useQueryResponseLoading();
  return (
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
        <Container>
          <Row>
            <DropZone />
          </Row>
          <Row>
            <FilesList />
            <FilesListPagination />
            {isLoading && <FilesListLoading />}
          </Row>
        </Container>

        {/* {loading && (
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
          )} */}
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
  );
};
