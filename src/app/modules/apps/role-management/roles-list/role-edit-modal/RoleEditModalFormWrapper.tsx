import { useQuery } from "react-query";
import { RoleEditModalForm } from "./RoleEditModalForm";
import { isNotEmpty, QUERIES } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { getPermissions, getRoleById } from "../core/_requests";

const RoleEditModalFormWrapper = () => {
  const { itemIdForUpdate, setItemIdForUpdate } = useListView();
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate);
  const {
    isLoading,
    data: role,
    error,
  } = useQuery(
    `${QUERIES.ROLES_LIST}-role-${itemIdForUpdate}`,
    () => {
      return getRoleById(itemIdForUpdate);
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

  const { data:permissions } = useQuery("permissions", () => {
    return (
      getPermissions()
    );
  });

  if (!itemIdForUpdate) {
    return (
      <RoleEditModalForm
        isUserLoading={isLoading}
        role={{ _id: undefined }}
        permissions={permissions}
      />
    );
  }

  if (!isLoading && !error && role) {
    return (
      <RoleEditModalForm
        isUserLoading={isLoading}
        role={role}
        permissions={permissions}
      />
    );
  }

  return null;
};

export { RoleEditModalFormWrapper };
