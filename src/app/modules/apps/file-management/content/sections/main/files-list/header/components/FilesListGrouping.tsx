import { useQueryClient, useMutation } from "react-query";
import { QUERIES } from "../../../../../../../../../../_metronic/helpers";
import { useListView } from "../../../../../core/ListViewProvider";
import { useQueryResponse } from "../../../../../core/QueryResponseProvider";
import { deleteSelectedFiles } from "../../../../../core/_requests";
import { useSwal } from "../../../../../../../../../customProviders/useSwal";

const FilesListGrouping = () => {
  const { selected, clearSelected } = useListView();
  const queryClient = useQueryClient();
  const { query } = useQueryResponse();
  const { showSwal } = useSwal();

  const deleteSelectedItems = useMutation(() => deleteSelectedFiles(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      // Add a delay before re-fetching the data
      setTimeout(() => {
        queryClient.invalidateQueries([`${QUERIES.FILES_LIST}-${query}`]);
      }, 2000); // Adjust the delay (e.g., 2000ms = 2 seconds) based on your server's deletion time
      clearSelected?.();
    },
  });

  const handleDeleteConfirmation = async () => {
    const result = await showSwal({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await deleteSelectedItems.mutateAsync();
      showSwal({
        title: "Deleted!",
        text: "The item has been deleted.",
        icon: "success",
      });
    }
  };

  return (
    <div className="d-flex justify-content-end align-items-center">
      <div className="fw-bolder me-5">
        <span className="me-2">{selected.length}</span> Selected
      </div>

      <button
        type="button"
        className="btn btn-danger"
        onClick={handleDeleteConfirmation}
      >
        Delete Selected
      </button>
    </div>
  );
};

export { FilesListGrouping };
