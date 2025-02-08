import { FC, useEffect } from "react";
import { ID, QUERIES } from "../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { useQueryResponse } from "../core/QueryResponseProvider";
import { useMutation, useQueryClient } from "react-query";
import { MenuComponent } from "../../../../_metronic/assets/ts/components";
import { deleteFile } from "../core/_requests";
import { useSwal } from "../../../customProviders/useSwal";

type Props = {
  id: ID;
};

const FileActionCell: FC<Props> = ({ id }) => {
  const { setItemIdForUpdate } = useListView();
  const { query } = useQueryResponse();
  const queryClient = useQueryClient();
  const { showSwal } = useSwal();

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const openEditModal = () => {
    setItemIdForUpdate(id);
  };

  const deleteItem = useMutation(() => deleteFile(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      setTimeout(() => {
        queryClient.invalidateQueries([`${QUERIES.FILES_LIST}-${query}`]);
      }, 2000); // Adjust the delay (e.g., 2000ms = 2 seconds) based on your server's deletion time
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
      await deleteItem.mutateAsync();
      showSwal({
        title: "Deleted!",
        text: "The item has been deleted.",
        icon: "success",
      });
    }
  };
  return (
    <>
      <div
        className="position-absolute top-0 end-0 z-index-1 p-2 hover-edit-custom no-select"
        onClick={openEditModal}
      >
        <i
          className="text-gray cursor-pointer bi bi-pencil-fill fs-7"
          // size={20}
          // onClick={() => onEditFile?.(file._id)}
        ></i>
      </div>
      <div
        className="position-absolute bottom-0 end-0 z-index-1 p-2 hover-edit-custom no-select"
        onClick={handleDeleteConfirmation}
      >
        <i
          className="text-gray cursor-pointer bi bi-trash-fill fs-7"
          // size={20}
          // onClick={() => onEditFile?.(file._id)}
        ></i>
      </div>
    </>
  );
};

export { FileActionCell };
