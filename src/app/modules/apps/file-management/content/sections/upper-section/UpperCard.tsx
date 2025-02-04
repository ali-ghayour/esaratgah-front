import { FC, useEffect, useState } from "react";
import { toAbsoluteUrl } from "../../../../../../../_metronic/helpers";
import { getTotalFileInfo } from "../../core/_requests";
import { TotalFileInfoResponse } from "../../core/_models";
import { formatFileSize } from "../../../../../../helpers/formatFileSize";
// import clsx from "clsx";

const UpperCard: FC = () => {
  // State to store total file info
  const [totalFileInfo, setTotalFileInfo] = useState<TotalFileInfoResponse>();

  // Fetch total file info on component mount
  useEffect(() => {
    const fetchTotalFileInfo = async () => {
      try {
        const response = await getTotalFileInfo();
        setTotalFileInfo(response); // Update state with API response
      } catch (error) {
        console.error("Failed to fetch total file info:", error);
      }
    };

    fetchTotalFileInfo();
  }, []);

  return (
    <>
      <div
        className="card card-flush pb-0 bgi-position-y-center bgi-no-repeat mb-10"
        // style="background-size: auto calc(100% + 10rem); background-position-x: 100%; background-image: url('assets/media/illustrations/sketchy-1/4.png')"
        style={{
          backgroundPosition: "right top",
          backgroundSize: "auto calc(100% + 10rem)",
          backgroundPositionX: "100%",
          backgroundPositionY: "center",
          backgroundImage: `url(${toAbsoluteUrl(
            "media/illustrations/sketchy-1/4.png"
          )})`,
        }}
      >
        {/* begin::Card header */}
        <div className="card-header pt-10">
          <div className="d-flex align-items-center">
            {/* begin::Icon */}
            <div className="symbol symbol-circle me-5">
              <div className="symbol-label bg-transparent text-primary border border-secondary border-dashed">
                <i className="ki-duotone ki-abstract-47 fs-2x text-primary">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </div>
            </div>
            {/* end::Icon */}
            {/* begin::Title */}
            <div className="d-flex flex-column">
              <h2 className="mb-1">File Manager</h2>
              <div className="text-muted fw-bold">
                <a href="#">Keenthemes</a>
                <span className="mx-3">|</span>
                <a href="#">File Manager</a>
                <span className="mx-3">|</span>
                {formatFileSize(totalFileInfo?.data?.totalSize as number)}
                <span className="mx-3">|</span>
                {`${totalFileInfo?.data?.totalFiles} items`}
              </div>
            </div>
            {/* end::Title */}
          </div>
        </div>
        {/* end::Card header */}
        {/* begin::Card body */}
        <div className="card-body pb-0">
          {/* begin::Navs */}
          <div className="d-flex overflow-auto h-55px">
            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-semibold flex-nowrap">
              {/* begin::Nav item */}
              <li className="nav-item">
                <a
                  className="nav-link text-active-primary me-6 active"
                  href="apps/file-manager/folders.html"
                >
                  Files
                </a>
              </li>
              {/* end::Nav item */}
              {/* begin::Nav item */}
              <li className="nav-item">
                <a
                  className="nav-link text-active-primary me-6"
                  href="apps/file-manager/settings.html"
                >
                  Settings
                </a>
              </li>
              {/* end::Nav item */}
            </ul>
          </div>
          {/* begin::Navs */}
        </div>
        {/* end::Card body */}
      </div>
    </>
  );
};

export { UpperCard };
