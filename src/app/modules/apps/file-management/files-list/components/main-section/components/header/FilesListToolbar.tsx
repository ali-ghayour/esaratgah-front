import { KTIcon } from "../../../../../../../../../_metronic/helpers";
import { useListView } from "../../../../core/ListViewProvider";
import { FilesListFilter } from "./FilesListFilter";

const FilesListToolbar = () => {
  const { setItemIdForUpdate } = useListView();
  const openAddFileModal = () => {
    setItemIdForUpdate(null);
  };

  return (
    <div
      className="d-flex justify-content-end"
      data-kt-user-table-toolbar="base"
    >
      <FilesListFilter />

      {/* begin::Export */}
      <button type="button" className="btn btn-light-primary me-3">
        <KTIcon iconName="exit-up" className="fs-2" />
        Export
      </button>
      {/* end::Export */}

      {/* begin::Upload File */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={openAddFileModal}
      >
        <KTIcon iconName="folder-up" className="fs-2" />
        Upload File
      </button>
      {/* end::Upload File */}
    </div>
  );
};

export { FilesListToolbar };
