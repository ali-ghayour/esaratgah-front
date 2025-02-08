import { useEffect } from "react";
import { Modal, Button, Container, Row } from "react-bootstrap";
import { DropZone } from "./components/DropZone";
import { FilesList } from "./components/FilesList";
import { FilesListPagination } from "./components/FilesListPagination";
import { useFileManagerModal } from "./useFileManagerModal";
import {
  useQueryResponse,
} from "./core/QueryResponseProvider";

export const FileManagerModal = () => {
  const { showModal, handleClose } = useFileManagerModal();
  const { refetch, isLoading } = useQueryResponse();

  useEffect(() => {
    if (showModal) {
      refetch(); // Manually trigger the query
    }
  }, [showModal,refetch]);

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
            {isLoading && <div>Loading files...</div>}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary">Select Files</Button>
      </Modal.Footer>
    </Modal>
  );
};
