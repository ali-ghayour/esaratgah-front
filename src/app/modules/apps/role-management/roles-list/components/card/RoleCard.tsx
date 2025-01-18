import { FC } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { QUERIES, toAbsoluteUrl } from "../../../../../../../_metronic/helpers";
import { Role } from "../../core/_models";
import { useListView } from "../../core/ListViewProvider";
import { useMutation, useQueryClient } from "react-query";
import { deleteRole } from "../../core/_requests";
import { useQueryResponse } from "../../core/QueryResponseProvider";

type Props = {
  roles: Array<Role>;
};

type RProps = {
  role: Role;
};

const MySwal = withReactContent(Swal);

const RoleCardWrapper: FC<Props> = ({ roles }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-9">
      {roles.map((role) => {
        return <RoleCard role={role} key={role._id} />;
      })}
      <AddRoleCard />
    </div>
  );
};

const AddRoleCard = () => {
  const { setItemIdForUpdate } = useListView();
  const openAddRoleModal = () => {
    setItemIdForUpdate(null);
  };
  return (
    <div className="col-md-4">
      <div className="card h-md-100">
        <div className="card-body d-flex flex-center">
          <button
            type="button"
            className="btn btn-clear d-flex flex-column flex-center"
          >
            <img
              src={toAbsoluteUrl("media/illustrations/sketchy-1/4.png")}
              alt=""
              className="mw-100 mh-150px mb-7"
            />
            <div
              className="fw-bold fs-3 text-gray-600 text-hover-primary"
              onClick={openAddRoleModal}
            >
              Add New Role
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const RoleCard: FC<RProps> = ({ role }) => {
  const { setItemIdForUpdate } = useListView();
  // const { refetch } = useQueryResponse();
  const { query } = useQueryResponse();
  const queryClient = useQueryClient();

  const openEditRoleModal = () => {
    setItemIdForUpdate(role._id);
  };

  const deleteItem = useMutation(() => deleteRole(role._id), {
    onSuccess: () => {
      queryClient.invalidateQueries([`${QUERIES.ROLES_LIST}-${query}`]);
    },
  });

  const handleDeleteConfirmation = async () => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this role? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await deleteItem.mutateAsync();
      MySwal.fire("Deleted!", "The role has been deleted.", "success");
    }
  };

  return (
    <div className="col-md-4">
      <div className="card card-flush h-md-100">
        <div className="card-header">
          <div className="card-title">
            <h2>{role.name}</h2>
          </div>
        </div>
        <div className="card-body pt-1">
          <div className="fw-bold text-gray-600 mb-5">
            Total users with this role: 5
          </div>
          <div className="d-flex flex-column text-gray-600">
            <div className="d-flex align-items-center py-2">
              <span className="bullet bg-primary me-3"></span>All Admin Controls
            </div>
            <div className="d-flex align-items-center py-2">
              <span className="bullet bg-primary me-3"></span>View and Edit
              Financial Summaries
            </div>
            <div className="d-flex align-items-center py-2">
              <span className="bullet bg-primary me-3"></span>Enabled Bulk
              Reports
            </div>
            <div className="d-flex align-items-center py-2">
              <span className="bullet bg-primary me-3"></span>View and Edit
              Payouts
            </div>
            <div className="d-flex align-items-center py-2">
              <span className="bullet bg-primary me-3"></span>View and Edit
              Disputes
            </div>
            <div className="d-flex align-items-center py-2">
              <span className="bullet bg-primary me-3"></span>
              <em>and 7 more...</em>
            </div>
          </div>
        </div>
        <div className="card-footer flex-wrap align-items-between pt-0">
          <button
            type="button"
            className="btn btn-light btn-active-light-primary my-1 me-2"
            onClick={openEditRoleModal}
          >
            Edit Role
          </button>
          <button
            className="btn btn-danger btn-active-primary my-1"
            onClick={handleDeleteConfirmation}
          >
            Delete Role
          </button>
        </div>
      </div>
    </div>
  );
};

export { RoleCardWrapper };
