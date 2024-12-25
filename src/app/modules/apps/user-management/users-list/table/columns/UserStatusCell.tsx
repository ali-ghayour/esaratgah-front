import clsx from "clsx";
import { FC } from "react";

type Props = {
  status?: "pending" | "active" | "locked";
};

const UserStatusCell: FC<Props> = ({ status }) => (
  //   <div className="badge badge-light fw-bolder">{status}</div>
  <div
    className={clsx(
      "badge fw-bolder ",
      {
        "badge-light-primary": status === "pending",
      },
      {
        "badge-light-success": status === "active",
      },
      {
        "badge-light-danger": status === "locked",
      }
    )}
  >
    {status}
  </div>
);

export { UserStatusCell };
