
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, login,request_otp} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'

const loginSchema = Yup.object().shape({
  phone_number: Yup.string()
    .length(11 , 'Invalid Phone number')
    .required('Phone number is required'),
  code: Yup.string()
    .length(5, "Invalid code!")
})

const initialValues = {
  phone_number: '09123456789',
  code: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const [showCodeInput,setShowCodeInput] = useState(true)
  const {saveAuth, setCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        if(!values.code){
          const {data: auth} = await request_otp(values.phone_number)
          setShowCodeInput(false);

        }
        // saveAuth(auth)
        // const {data: user} = await getUserByToken(auth.api_token)
        // setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-gray-900 fw-bolder mb-3'>Sign In</h1>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : null}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-gray-900'>Phone number</label>
        <input
          placeholder='Phone_number'
          {...formik.getFieldProps('phone_number')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.phone_number && formik.errors.phone_number},
            {
              'is-valid': formik.touched.phone_number && !formik.errors.phone_number,
            }
          )}
          type='phone_number'
          name='phone_number'
          autoComplete='on'
        />
        {formik.touched.phone_number && formik.errors.phone_number && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.phone_number}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-gray-900 fs-6 mb-0'>Code</label>
        <input
          type='code'
          autoComplete='off'
          disabled={showCodeInput}
          {...formik.getFieldProps('code')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.code && formik.errors.code,
            },
            {
              'is-valid': formik.touched.code && !formik.errors.code,
            }
          )}
        />
        {formik.touched.code && formik.errors.code && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.code}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary'>
          Forgot Password ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}

      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up
        </Link>
      </div>
    </form>
  )
}
