import { useQuery } from "react-query";
import { ImageUploadModalForm } from "./ImageUploadModalForm";
import { isNotEmpty, QUERIES } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { getFileById } from "../core/_requests";

const ImageUploadModalFormWrapper = () => {
  const { itemIdForUpdate, setItemIdForUpdate } = useListView();
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate);
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getFileById(itemIdForUpdate);
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined);
        console.error(err);
      },
    }
  );

  if (!itemIdForUpdate) {
    return (
      <ImageUploadModalForm
        // isUserLoading={isLoading}
        // user={{ _id: undefined }}
        // roles={roles?.data}
      />
    );
  }

  if (!isLoading && !error && user) {
    return (
      <ImageUploadModalForm
        // isUserLoading={isLoading}
        // user={user}
        // roles={roles?.data}
      />
    );
  }

  return null;
};

export { ImageUploadModalFormWrapper };
