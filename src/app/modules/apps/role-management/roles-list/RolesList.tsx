import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { UsersListHeader } from "./components/header/UsersListHeader";
import { UsersTable } from "./table/UsersTable";
import { RoleEditModal } from "./role-edit-modal/RoleEditModal";
import { KTCard } from "../../../../../_metronic/helpers";
import { ToolbarWrapper } from "../../../../../_metronic/layout/components/toolbar";
import { Content } from "../../../../../_metronic/layout/components/content";
import { RoleCardWrapper } from "./components/card/RoleCard";

const RolesList = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <RoleCardWrapper />
      {/* </KTCard> */}
      {itemIdForUpdate !== undefined && <RoleEditModal />}
    </>
  );
};

const RolesListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <RolesList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { RolesListWrapper };
