import { useQuery } from "react-query";
import { RoleEditModalForm } from "./RoleEditModalForm";
import { isNotEmpty, QUERIES } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { getPermissions, getRoleById } from "../core/_requests";

const RoleEditModalFormWrapper = () => {
  const { itemIdForUpdate, setItemIdForUpdate } = useListView();
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate);

  const {
    isLoading: isRoleLoading,
    data: role,
    error,
  } = useQuery(
    `${QUERIES.ROLES_LIST}-role-${itemIdForUpdate}`,
    () => getRoleById(itemIdForUpdate),
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined);
        console.error(err);
      },
    }
  );

  const { data: permissions, isLoading: isPermissionsLoading } = useQuery(
    "permissions",
    getPermissions
  );

  // Show loading state while either query is loading
  if (isRoleLoading || isPermissionsLoading) {
    return <div>Loading...</div>;
  }

  // Handle case where `permissions` or `role` is undefined
  if (!permissions) {
    return <div>Error loading permissions</div>;
  }

  if (!itemIdForUpdate) {
    return (
      <RoleEditModalForm
        isUserLoading={isRoleLoading}
        role={{ _id: undefined }}
        permissions={permissions}
      />
    );
  }

  if (!isRoleLoading && !error && role) {
    return (
      <RoleEditModalForm
        isUserLoading={isRoleLoading}
        role={role}
        permissions={permissions}
      />
    );
  }

  return null;
};

export { RoleEditModalFormWrapper };
