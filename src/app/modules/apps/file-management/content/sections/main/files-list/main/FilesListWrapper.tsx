import { useQueryResponseLoading } from "../../../../core/QueryResponseProvider";
import { FilesListLoading } from "./components/loading/FilesListLoading";
import { FilesListPagination } from "./components/pagination/FilesListPagination";
import { FilesList } from "./list/FilesList";

export const FilesListWrapper = () => {
  const isLoading = useQueryResponseLoading();
  return (
    <>
      <div className="py-4">
        <FilesList />
        <FilesListPagination />
        {isLoading && <FilesListLoading />}
      </div>
    </>
  );
};
