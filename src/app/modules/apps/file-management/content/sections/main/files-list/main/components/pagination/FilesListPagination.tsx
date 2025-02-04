import clsx from "clsx";
import {
  useQueryResponseLoading,
  useQueryResponsePagination,
} from "../../../../../../core/QueryResponseProvider";
import { useQueryRequest } from "../../../../../../core/QueryRequestProvider";
import { PaginationState } from "../../../../../../../../../../../_metronic/helpers";
import { useMemo } from "react";
import { useListView } from "../../../../../../core/ListViewProvider";

const mappedLabel = (label: string): string => {
  if (label === "&laquo; Previous") {
    return "Previous";
  }

  if (label === "Next &raquo;") {
    return "Next";
  }

  return label;
};

const FilesListPagination = () => {
  const pagination = useQueryResponsePagination();
  const isLoading = useQueryResponseLoading();
  const { perPage, setPerPage } = useListView();
  const { updateState } = useQueryRequest();
  const updatePage = (page: number | undefined | null) => {
    if (!page || isLoading || pagination.page === page) {
      return;
    }
    updateState({ page, items_per_page: perPage });
  };

  // perpage config
  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage?.(+event.target.value); // Update state on selection
    UpdatePerPage(+event.target.value);
  };
  const UpdatePerPage = (items_per_page: number | undefined | null) => {
    if (
      !items_per_page ||
      isLoading ||
      pagination.items_per_page === items_per_page
    ) {
      return;
    }

    updateState({ items_per_page });
  };

  const PAGINATION_PAGES_COUNT = 5;
  const sliceLinks = (pagination?: PaginationState) => {
    if (!pagination?.links?.length) {
      return [];
    }

    const scopedLinks = [...pagination.links];
    let pageLinks: Array<{
      label: string;
      active: boolean;
      url: string | null;
      page: number | null;
    }> = [];
    const previousLink: {
      label: string;
      active: boolean;
      url: string | null;
      page: number | null;
    } = scopedLinks.shift()!;
    const nextLink: {
      label: string;
      active: boolean;
      url: string | null;
      page: number | null;
    } = scopedLinks.pop()!;

    const halfOfPagesCount = Math.floor(PAGINATION_PAGES_COUNT / 2);

    pageLinks.push(previousLink);

    if (
      pagination.page <= Math.round(PAGINATION_PAGES_COUNT / 2) ||
      scopedLinks.length <= PAGINATION_PAGES_COUNT
    ) {
      pageLinks = [
        ...pageLinks,
        ...scopedLinks.slice(0, PAGINATION_PAGES_COUNT),
      ];
    }

    if (
      pagination.page > scopedLinks.length - halfOfPagesCount &&
      scopedLinks.length > PAGINATION_PAGES_COUNT
    ) {
      pageLinks = [
        ...pageLinks,
        ...scopedLinks.slice(
          scopedLinks.length - PAGINATION_PAGES_COUNT,
          scopedLinks.length
        ),
      ];
    }

    if (
      !(
        pagination.page <= Math.round(PAGINATION_PAGES_COUNT / 2) ||
        scopedLinks.length <= PAGINATION_PAGES_COUNT
      ) &&
      !(pagination.page > scopedLinks.length - halfOfPagesCount)
    ) {
      pageLinks = [
        ...pageLinks,
        ...scopedLinks.slice(
          pagination.page - 1 - halfOfPagesCount,
          pagination.page + halfOfPagesCount
        ),
      ];
    }
    if (nextLink) pageLinks.push(nextLink);
    return pageLinks;
  };

  const paginationLinks = useMemo(() => sliceLinks(pagination), [pagination]);

  return (
    <div className="row mt-5">
      <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
        <div>
          <select
            name="item_per_page"
            id="item_per_page"
            className="form-select form-select-solid form-select-sm"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
            <option value="60">60</option>
            <option value="120">120</option>
          </select>
        </div>
      </div>
      <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
        <div id="kt_table_users_paginate">
          <ul className="pagination">
            <li
              className={clsx("page-item", {
                disabled: isLoading || pagination.page === 1,
              })}
            >
              <a
                onClick={() => updatePage(1)}
                style={{ cursor: "pointer" }}
                className="page-link"
              >
                First
              </a>
            </li>
            {paginationLinks
              ?.map((link) => {
                // console.log(link);
                return { ...link, label: mappedLabel(link.label) };
              })
              .map((link) => (
                <li
                  key={link.label}
                  className={clsx("page-item", {
                    active: pagination.page === link.page,
                    disabled: isLoading,
                    previous: link.label === "Previous",
                    next: link.label === "Next",
                  })}
                >
                  <a
                    className={clsx("page-link", {
                      "page-text":
                        link.label === "Previous" || link.label === "Next",
                      "me-5": link.label === "Previous",
                    })}
                    onClick={() => updatePage(link.page)}
                    style={{ cursor: "pointer" }}
                  >
                    {mappedLabel(link.label)}
                  </a>
                </li>
              ))}
            <li
              className={clsx("page-item", {
                disabled:
                  isLoading ||
                  pagination.page === (pagination.links?.length || 3),
              })}
            >
              <a
                onClick={() => updatePage(pagination.links?.length || 3)}
                style={{ cursor: "pointer" }}
                className="page-link"
              >
                Last
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { FilesListPagination };
