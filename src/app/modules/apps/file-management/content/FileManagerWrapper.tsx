import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { ToolbarWrapper } from "../../../../../_metronic/layout/components/toolbar";
import { Content } from "../../../../../_metronic/layout/components/content";
import { Sections } from "./sections/Sections";
import { ImageUploadModal } from "./file-manager-modal/ImageUploadModal";

const FileManager = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <Sections/>
      {itemIdForUpdate !== undefined && <ImageUploadModal />}
    </>
  );
};

const FileManagerWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <FileManager />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { FileManagerWrapper };
