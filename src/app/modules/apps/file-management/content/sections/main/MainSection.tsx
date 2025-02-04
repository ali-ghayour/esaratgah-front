import { FC } from "react";
import { FilesListHeader } from "./files-list/header/FilesListHeader";
import { FilesListWrapper } from "./files-list/main/FilesListWrapper";
import { KTCard } from "../../../../../../../_metronic/helpers";

export const MainSection: FC = () => {
  return (
    <>
      <KTCard>
        <FilesListHeader />
        <FilesListWrapper />
      </KTCard>
    </>
  );
};
