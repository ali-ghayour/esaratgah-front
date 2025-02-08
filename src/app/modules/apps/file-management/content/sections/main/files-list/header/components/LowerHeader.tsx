/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useListView } from "../../../../../core/ListViewProvider";
import { useQueryRequest } from "../../../../../core/QueryRequestProvider";
import { useDebounce } from "../../../../../../../../../../_metronic/helpers";

export const LowerHeader = () => {
  const { isAllSelected, onSelectAll } = useListView();
  const { updateState } = useQueryRequest();
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // Combine sort and order state for debouncing
  const [sortState, setSortState] = useState<string>("createdAt_desc");
  const debouncedSortState = useDebounce(sortState, 1000);

  useEffect(() => {
    if (debouncedSortState) {
      const [debouncedSortBy, debouncedOrder] = debouncedSortState.split("_");
      updateState({ sort: debouncedSortBy, order: debouncedOrder as "asc"|"desc" });
    }
  }, [debouncedSortState]);

  const handleSortChange = (value: string) => {
    setSortState(value);
    const [newSortBy, newOrder] = value.split("_");
    setSortBy(newSortBy);
    setOrder(newOrder as "asc" | "desc");
  };

  return (
    <div className="d-flex justify-content-between align-items-center border rounded bg-light-secondary shadow">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isAllSelected}
          onChange={onSelectAll}
        />
        <label className="form-check-label">Select All</label>
      </div>

      <div className="d-flex gap-3">
        {/* Sorting Dropdown */}
        <select
          name="sort"
          aria-label="Sort"
          data-placeholder="Sort by"
          className="form-select form-select-solid form-select-sm bg-light border-0"
          onChange={(e) => handleSortChange(e.target.value)}
          value={`${sortBy}_${order}`}
        >
          <option value="createdAt_desc">Sort by Newest</option>
          <option value="createdAt_asc">Sort by Oldest</option>
          <option value="size_asc">Sort by Smallest</option>
          <option value="size_desc">Sort by Largest</option>
        </select>
      </div>
    </div>
  );
};
