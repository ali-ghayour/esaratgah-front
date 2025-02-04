import { FC } from "react";
import { FilesListHeader } from "./files-list/header/FilesListHeader";
import { FilesListWrapper } from "./files-list/main/FilesListWrapper";
import { KTCard, KTCardBody } from "../../../../../../../_metronic/helpers";

export const MainSection: FC = () => {
  return (
    <>
      <KTCard>
        <KTCardBody className="py-4">
          <FilesListHeader />
          <FilesListWrapper />
        </KTCardBody>
      </KTCard>
    </>
  );
};
