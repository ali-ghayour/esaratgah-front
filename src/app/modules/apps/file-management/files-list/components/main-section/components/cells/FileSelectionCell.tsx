import { FC, useMemo } from "react";
import { ID } from "../../../../../../../../../_metronic/helpers";
import { useListView } from "../../../../core/ListViewProvider";
import clsx from "clsx";

type Props = {
  id: ID;
};

const FileSelectionCell: FC<Props> = ({ id }) => {
  const { selected, onSelect } = useListView();
  const isSelected = useMemo(() => selected.includes(id), [id, selected]);
  return (
    <div
      className={clsx(
        "form-check position-absolute top-0 start-0 z-index-1 m-2",
        { " hover-checkbox-custom": selected.length === 0 }
      )}
      style={{ zIndex: 2 }}
    >
      <input
        type="checkbox"
        className="form-check-input"
        data-kt-check={isSelected}
        checked={isSelected}
        onChange={() => onSelect?.(id)} // Toggles selection
        onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the card container
      />
    </div>
  );
};

export { FileSelectionCell };
