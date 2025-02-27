import { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty, toAbsoluteUrl } from "../../../../../../_metronic/helpers";
import { initialUser, User } from "../core/_models";
import clsx from "clsx";
import { useListView } from "../core/ListViewProvider";
import { UsersListLoading } from "../components/loading/UsersListLoading";
import { createUser, updateUser } from "../core/_requests";
import { useQueryResponse } from "../core/QueryResponseProvider";
import { Role } from "../../../role-management/roles-list/core/_models";
import { useFileManagerModal } from "../../../../../customProviders/FileManager/useFileManagerModal";
import { File } from "../../../file-management/content/core/_models";

type Props = {
  isUserLoading: boolean;
  user: User;
  roles: Role[] | undefined;
};

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  family: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Family is required"),
});

const UserEditModalForm: FC<Props> = ({ user, isUserLoading, roles }) => {
  const API_UPLOADS_URL = import.meta.env.VITE_APP_UPLOADS_URL;
  const { setItemIdForUpdate, itemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();
  const { openModal } = useFileManagerModal();
  const blankImg = toAbsoluteUrl("media/svg/avatars/blank.svg");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    user.pic?.sizes?.medium
      ? API_UPLOADS_URL+user.pic.sizes.medium
      : blankImg
  );

  const handleSingleFileSelection = (file: File[] | null) => {
    if (file && file.length > 0) {
      formik.setFieldValue("pic", file[0]._id);
      setAvatarUrl(API_UPLOADS_URL+file[0].sizes?.medium);
    }
  };

  const handleRemoveAvatar = () => {
    formik.setFieldValue("pic", null);
    setAvatarUrl(blankImg);
  };

  // const handleMultipleFileSelection = (files: string | string[] | null) => {
  //   if (files && Array.isArray(files)) {
  //     alert(`Selected Files: ${files.join(", ")}`);
  //   }
  // };

  const [userForEdit] = useState<User>({
    ...user,
    name: user.name || initialUser.name,
    family: user.family || initialUser.family,
    phone_number: user.phone_number || initialUser.phone_number,
    pic: user.pic || initialUser.pic,
    role: user.role || initialUser.role,
    permissions: user.permissions || initialUser.permissions,
    camp: user.camp || initialUser.camp,
  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
  };

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (isNotEmpty(values._id)) {
          await updateUser(values);
        } else {
          await createUser(values);
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(true);
        cancel(true);
      }
    },
  });

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
          {/* begin::Input group */}
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="d-block fw-bold fs-6 mb-5">Avatar</label>
            {/* end::Label */}

            {/* begin::Image input */}
            <div
              className="image-input image-input-outline"
              data-kt-image-input="true"
            >
              {/* begin::Preview existing avatar */}
              <div className="image-input-wrapper w-125px h-125px">
                <img
                  src={avatarUrl}
                  className="w-125px h-125px"
                  alt={blankImg}
                />
              </div>
              {/* end::Preview existing avatar */}

              {/* begin::Label */}
              <div onClick={() => openModal(handleSingleFileSelection, false)}>
                <label
                  className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i className="bi bi-pencil-fill fs-7"></i>
                </label>
              </div>
              {/* end::Label */}

              {/* <div onClick={() => openModal(handleMultipleFileSelection, true)}>
                <label
                  className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i className="bi bi-pencil-fill fs-7"></i>
                </label>
              </div> */}

              {/* begin::Remove */}
              <span
                className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                data-kt-image-input-action="remove"
                data-bs-toggle="tooltip"
                title="Remove avatar"
                onClick={handleRemoveAvatar}
              >
                <i className="bi bi-x fs-2"></i>
              </span>
              {/* end::Remove */}
            </div>
            {/* end::Image input */}

            {/* begin::Hint */}
            {/* <div className='form-text'>Allowed file types: png, jpg, jpeg.</div> */}
            {/* end::Hint */}
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-2">Name</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder="Name"
              {...formik.getFieldProps("name")}
              type="text"
              name="name"
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
            {/* end::Input */}
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-2">Family</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder="Family"
              {...formik.getFieldProps("family")}
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                { "is-invalid": formik.touched.family && formik.errors.family },
                {
                  "is-valid": formik.touched.family && !formik.errors.family,
                }
              )}
              type="text"
              name="family"
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
            {/* end::Input */}
            {formik.touched.family && formik.errors.family && (
              <div className="fv-plugins-message-container">
                <span role="alert">{formik.errors.family}</span>
              </div>
            )}
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-2">Phone Number</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder="Phone Number"
              {...formik.getFieldProps("phone_number")}
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                {
                  "is-invalid":
                    formik.touched.phone_number && formik.errors.phone_number,
                },
                {
                  "is-valid":
                    formik.touched.phone_number && !formik.errors.phone_number,
                }
              )}
              type="text"
              name="phone_number"
              autoComplete="off"
              disabled={itemIdForUpdate ? true : false}
            />
            {/* end::Input */}
            {formik.touched.phone_number && formik.errors.phone_number && (
              <div className="fv-plugins-message-container">
                <span role="alert">{formik.errors.phone_number}</span>
              </div>
            )}
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className="mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-5">Role</label>
            {/* end::Label */}
            {/* begin::Roles */}
            {/* begin::Input row */}
            {roles?.map((role) => {
              return (
                <div key={role._id}>
                  <div className="d-flex fv-row">
                    {/* begin::Radio */}
                    <div className="form-check form-check-custom form-check-solid">
                      {/* begin::Input */}
                      <input
                        className="form-check-input me-3"
                        {...formik.getFieldProps("role")}
                        name="role"
                        type="radio"
                        value={role._id}
                        id={`kt_modal_update_role_option_${role._id}`}
                        checked={formik.values.role === role._id} // Compare by role ID
                        disabled={formik.isSubmitting || isUserLoading}
                        onChange={(e) => {
                          formik.setFieldValue("role", +e.target.value); // Set the role ID
                        }}
                      />
                      {/* end::Input */}
                      {/* begin::Label */}
                      <label
                        className="form-check-label"
                        htmlFor={`kt_modal_update_role_option_${role._id}`}
                      >
                        <div className="fw-bolder text-gray-800">
                          {role.name}
                        </div>
                      </label>
                      {/* end::Label */}
                    </div>
                    {/* end::Radio */}
                  </div>

                  <div className="separator separator-dashed my-5"></div>
                </div>
              );
            })}

            {/* end::Roles */}
          </div>
          {/* end::Input group */}
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => cancel()}
            className="btn btn-light me-3"
            data-kt-users-modal-action="cancel"
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            data-kt-users-modal-action="submit"
            disabled={
              isUserLoading ||
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.touched
            }
          >
            <span className="indicator-label">Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className="indicator-progress">
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  );
};

export { UserEditModalForm };
