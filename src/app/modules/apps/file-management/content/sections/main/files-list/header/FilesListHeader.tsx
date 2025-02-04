import { useListView } from "../../../../core/ListViewProvider";
import { FilesListToolbar } from "./components/FilesListToolbar";
import { FilesListGrouping } from "./components/FilesListGrouping";
import { FilesListSearchComponent } from "./components/FilesListSearchComponent";

const FilesListHeader = () => {
  const { selected } = useListView();
  return (
    <div className="card-header border-0 pt-6">
      <FilesListSearchComponent />
      {/* begin::Card toolbar */}
      <div className="card-toolbar">
        {/* begin::Group actions */}
        {selected.length > 0 ? <FilesListGrouping /> : <FilesListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

export { FilesListHeader };
