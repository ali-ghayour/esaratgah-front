import { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty, KTCard } from "../../../../../../_metronic/helpers";
import { initialRole, Permissions, Role } from "../core/_models";
import clsx from "clsx";
import { useListView } from "../core/ListViewProvider";
import { UsersListLoading } from "../components/loading/UsersListLoading";
import { createRole, updateRole } from "../core/_requests";
import { useQueryResponse } from "../core/QueryResponseProvider";

type Props = {
  isUserLoading: boolean;
  role: Role;
  permissions?: Permissions;
};

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  slug: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Slug is required"),
});

const RoleEditModalForm: FC<Props> = ({ role, isUserLoading, permissions }) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();

  const [roleForEdit] = useState<Role>({
    ...role,
    name: role.name || initialRole.name,
    slug: role.slug || initialRole.slug,
    permissions: role.permissions || permissions || {}, // Ensure permissions always have a fallback
  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
  };

  const formik = useFormik({
    initialValues: roleForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (isNotEmpty(values._id)) {
          await updateRole(values);
        } else {
          await createRole(values);
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(false);
        cancel(true);
      }
    },
  });

  const handlePermissionChange = (
    permissionGroup: string,
    action: string,
    checked: boolean
  ) => {
    const updatedPermissions = {
      ...formik.values.permissions,
      [permissionGroup]: {
        ...(formik.values.permissions?.[permissionGroup] || {}),
        [action]: checked,
      },
    };
    formik.setFieldValue("permissions", updatedPermissions);
  };

  const handleSelectAll = (checked: boolean) => {
    const updatedPermissions = Object.keys(permissions || {}).reduce(
      (acc, permissionGroup) => {
        acc[permissionGroup] = {
          read: checked,
          write: checked,
          create: checked,
          delete: checked,
        };
        return acc;
      },
      {} as Record<string, Record<string, boolean>>
    );
    formik.setFieldValue("permissions", updatedPermissions);
  };

  const isAllSelected = () => {
    const allPermissions = Object.values(formik.values.permissions || {}).flatMap(
      (group) => Object.values(group || {})
    );
    return allPermissions.length > 0 && allPermissions.every((perm) => perm === true);
  };

  return (
    <>
      <form
        id="kt_modal_add_user_form"
        className="form"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        {/* begin::Scroll */}
        <div
          className="d-flex flex-column scroll-y me-n7 pe-7"
          id="kt_modal_add_user_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_user_header"
          data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
          data-kt-scroll-offset="300px"
        >
          {/* Input group for Name */}
          <div className="fv-row mb-7">
            <label className="required fw-bold fs-6 mb-2">Name</label>
            <input
              placeholder="Full name"
              {...formik.getFieldProps("name")}
              type="text"
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                { "is-invalid": formik.touched.name && formik.errors.name },
                {
                  "is-valid": formik.touched.name && !formik.errors.name,
                }
              )}
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.name}</span>
                </div>
              </div>
            )}
          </div>

          {/* Input group for Slug */}
          <div className="fv-row mb-7">
            <label className="required fw-bold fs-6 mb-2">Slug</label>
            <input
              placeholder="Slug"
              {...formik.getFieldProps("slug")}
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                { "is-invalid": formik.touched.slug && formik.errors.slug },
                {
                  "is-valid": formik.touched.slug && !formik.errors.slug,
                }
              )}
              type="text"
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.slug && formik.errors.slug && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.slug}</span>
                </div>
              </div>
            )}
          </div>

          {/* Permissions Table */}
          <div className="mb-7">
            <label className="fw-bold fs-6 mb-5">Role Permissions</label>
            <div className="table-responsive">
              <table className="table align-middle table-row-dashed fs-6 gy-5">
                <thead>
                  <tr>
                    <th>
                      <label className="form-check form-check-sm form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={isAllSelected()}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                        <span className="form-check-label">Select All</span>
                      </label>
                    </th>
                    <th>Permissions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 fw-semibold">
                  {Object.keys(roleForEdit.permissions || {}).map(
                    (permissionGroup) => (
                      <tr key={permissionGroup}>
                        <td className="text-gray-800">{permissionGroup}</td>
                        <td>
                          <div className="d-flex">
                            {["read", "write", "create", "delete"].map(
                              (action) => (
                                <label
                                  key={`${permissionGroup}-${action}`}
                                  className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20"
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={
                                      formik.values.permissions?.[permissionGroup]?.[
                                        action
                                      ] || false
                                    }
                                    onChange={(e) =>
                                      handlePermissionChange(
                                        permissionGroup,
                                        action,
                                        e.target.checked
                                      )
                                    }
                                  />
                                  <span className="form-check-label">
                                    {action.charAt(0).toUpperCase() +
                                      action.slice(1)}
                                  </span>
                                </label>
                              )
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => cancel()}
            className="btn btn-light me-3"
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              isUserLoading || formik.isSubmitting || !formik.isValid
            }
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export { RoleEditModalForm };


