import { FC, useEffect } from "react";
import { ID, QUERIES } from "../../../../../../../../../_metronic/helpers";
import { useListView } from "../../../../core/ListViewProvider";
import "./FileCell.css";
import { useQueryResponse } from "../../../../core/QueryResponseProvider";
import { useMutation, useQueryClient } from "react-query";
import { MenuComponent } from "../../../../../../../../../_metronic/assets/ts/components";
import { deleteFile } from "../../../../core/_requests";

type Props = {
  id: ID;
};

const FileActionCell: FC<Props> = ({ id }) => {
  const { setItemIdForUpdate } = useListView();
  const { query } = useQueryResponse();
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`]);
    },
  });
  return (
    <>
      <div
        className="position-absolute top-0 end-0 z-index-1 p-2 hover-edit-custom"
        onClick={openEditModal}
      >
        <i
          className="text-gray cursor-pointer bi bi-pencil-fill fs-7"
          // size={20}
          // onClick={() => onEditFile?.(file._id)}
        ></i>
      </div>
      <div
        className="position-absolute bottom-0 end-0 z-index-1 p-2 hover-edit-custom"
        onClick={async () => await deleteItem.mutateAsync()}
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
