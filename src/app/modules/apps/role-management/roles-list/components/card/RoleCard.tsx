import { toAbsoluteUrl } from "../../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";

const RoleCardWrapper = () => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-9">
      <RoleCard />
      <RoleCard />
      <AddRoleCard />
    </div>
  );
};

const AddRoleCard = () => {
  const {setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }
  return (
    <div className="ol-md-4">
      {/* begin::Card */}
      <div className="card h-md-100">
        {/* begin::Card body */}
        <div className="card-body d-flex flex-center">
          {/* begin::Button */}
          <button
            type="button"
            className="btn btn-clear d-flex flex-column flex-center"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_role"
          >
            {/* begin::Illustration */}
            <img
              src={toAbsoluteUrl("media/illustrations/sketchy-1/4.png")}
              alt=""
              className="mw-100 mh-150px mb-7"
            />
            {/* end::Illustration */}
            {/* begin::Label */}
            <div className="fw-bold fs-3 text-gray-600 text-hover-primary" onClick={openAddUserModal}>
              Add New Role
            </div>
            {/* end::Label */}
          </button>
          {/* begin::Button */}
        </div>
        {/* begin::Card body */}
      </div>
      {/* begin::Card */}
    </div>
  );
};

const RoleCard = () => {
  return (
    <div className="col-md-4">
      {/* begin::Card */}
      <div className="card card-flush h-md-100">
        {/* begin::Card header */}
        <div className="card-header">
          {/* begin::Card title */}
          <div className="card-title">
            <h2>Administrator</h2>
          </div>
          {/* end::Card title */}
        </div>
        {/* end::Card header */}
        {/* begin::Card body */}
        <div className="card-body pt-1">
          {/* begin::Users */}
          <div className="fw-bold text-gray-600 mb-5">
            Total users with this role: 5
          </div>
          {/* end::Users */}
          {/* begin::Permissions */}
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
          {/* end::Permissions */}
        </div>
        {/* end::Card body */}
        {/* begin::Card footer */}
        <div className="card-footer flex-wrap pt-0">
          <a
            href="apps/user-management/roles/view.html"
            className="btn btn-light btn-active-primary my-1 me-2"
          >
            View Role
          </a>
          <button
            type="button"
            className="btn btn-light btn-active-light-primary my-1"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_update_role"
          >
            Edit Role
          </button>
        </div>
        {/* end::Card footer */}
      </div>
      {/* end::Card */}
    </div>
  );
};

export { RoleCardWrapper };
