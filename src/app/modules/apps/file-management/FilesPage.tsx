import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { FilesListWrapper } from "./files-list/FilesList";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: "File Management",
    path: "/apps/file-management/files",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const FilesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="files"
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Files list</PageTitle>
              <FilesListWrapper/>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/apps/file-management/files" />} />
    </Routes>
  );
};

export default FilesPage;
