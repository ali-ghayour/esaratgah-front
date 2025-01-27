import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { KTCard } from "../../../../../_metronic/helpers";
import { ToolbarWrapper } from "../../../../../_metronic/layout/components/toolbar";
import { Content } from "../../../../../_metronic/layout/components/content";
import { UpperCard } from "./components/upper-section/UpperCard";
import { FileManager } from "./components/main-section/FileManager";
import { FilesListHeader } from "./components/main-section/components/header/FilesListHeader";
import { ImageUploadModal } from "./file-manager-modal/ImageUploadModal";

const FilesList = () => {
    const { itemIdForUpdate } = useListView();
  return (
    <>
      <UpperCard/>
      <KTCard>
        <FilesListHeader />
        <FileManager />
      </KTCard>
      {itemIdForUpdate !== undefined && <ImageUploadModal />}
    </>
  );
};

const FilesListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <FilesList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { FilesListWrapper };
