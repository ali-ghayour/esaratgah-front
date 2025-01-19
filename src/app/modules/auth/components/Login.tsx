import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { getUserByToken, login, request_otp } from "../core/_requests";
// import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../core/Auth";
import { useToast } from "../../../customProviders/useToast";

const loginSchema = Yup.object().shape({
  phone_number: Yup.string()
    .length(11, "Invalid Phone number")
    .required("Phone number is required"),
  code: Yup.string().length(6, "Invalid code!"),
});

const initialValues = {
  phone_number: "09358441163",
  code: "",
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(true);
  const { saveAuth, setCurrentUser } = useAuth();
  const { addToast } = useToast();

  const showSuccessToast = (message: string) => {
    addToast({
      title: "Success",
      message,
      type: "light-success",
      autoHide: 3000, // 3 seconds
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        if (!values.code) {
          const result = await request_otp(values.phone_number);
          console.log(result?.payload?.message);

          setShowCodeInput(false);
          if (result?.data?.sent_code) {
            setSubmitting(false);
            setLoading(false);
            setStatus(null);
            showSuccessToast(result?.payload?.message as string);
          }
        } else {
          const { data: auth } = await login(values.phone_number, values.code);
          saveAuth(auth);
          const { data: user } = await getUserByToken(auth.api_token);
          setCurrentUser(user);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);

        saveAuth(undefined);
        setStatus(
          error!.response!.data!.payload!.message as
            | "The login details are incorrect"
        );
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      {/* begin::Heading */}
      <div className="text-center mb-11">
        <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      ) : null}

      {/* begin::Form group */}
      <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-gray-900">
          Phone number
        </label>
        <input
          placeholder="Phone_number"
          {...formik.getFieldProps("phone_number")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid":
                formik.touched.phone_number && formik.errors.phone_number,
            },
            {
              "is-valid":
                formik.touched.phone_number && !formik.errors.phone_number,
            }
          )}
          type="phone_number"
          name="phone_number"
          autoComplete="on"
          disabled={!showCodeInput}
        />
        {formik.touched.phone_number && formik.errors.phone_number && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.phone_number}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-3">
        <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
          Code
        </label>
        <input
          type="code"
          autoComplete="off"
          disabled={showCodeInput}
          {...formik.getFieldProps("code")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.code && formik.errors.code,
            },
            {
              "is-valid": formik.touched.code && !formik.errors.code,
            }
          )}
        />
        {formik.touched.code && formik.errors.code && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.code}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div />

        {/* begin::Link */}
        <Link to="/auth/forgot-password" className="link-primary">
          Forgot Password ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className="indicator-label">Continue</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}

      <div className="text-gray-500 text-center fw-semibold fs-6">
        Not a Member yet?{" "}
        <Link to="/auth/registration" className="link-primary">
          Sign up
        </Link>
      </div>
    </form>
  );
}
