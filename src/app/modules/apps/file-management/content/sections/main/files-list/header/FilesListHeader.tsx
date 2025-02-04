import { useListView } from "../../../../core/ListViewProvider";
import { FilesListToolbar } from "./components/FilesListToolbar";
import { FilesListGrouping } from "./components/FilesListGrouping";
import { FilesListSearchComponent } from "./components/FilesListSearchComponent";
import { LowerHeader } from "./components/LowerHeader";

const FilesListHeader = () => {
  const { selected } = useListView();
  return (
    <>
      <div className="container-fluid align-items-stretch py-4">
        <div className="row">
          <div className="d-flex justify-content-between">
            <FilesListSearchComponent />
            <div className="d-flex">
              {selected.length > 0 ? (
                <FilesListGrouping />
              ) : (
                <FilesListToolbar />
              )}
            </div>
          </div>
        </div>
        <div className="row py-4 mt-3">
          <LowerHeader/>
        </div>
      </div>
    </>
  );
};

export { FilesListHeader };
