import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider, useQueryResponseData } from "./core/QueryResponseProvider";
import { RoleEditModal } from "./role-edit-modal/RoleEditModal";
import { ToolbarWrapper } from "../../../../../_metronic/layout/components/toolbar";
import { Content } from "../../../../../_metronic/layout/components/content";
import { RoleCardWrapper } from "./components/card/RoleCard";

const RolesList = () => {
  const { itemIdForUpdate } = useListView();
  const data = useQueryResponseData();
  return (
    <>
      <RoleCardWrapper roles={data} />
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
