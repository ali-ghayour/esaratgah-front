
// import clsx from 'clsx'
import {FC} from 'react'
// import {toAbsoluteUrl} from '../../../../../../../_metronic/helpers'
import {User} from '../../core/_models'

type Props = {
  user: User
}
const API_UPLOADS_URL = import.meta.env.VITE_APP_UPLOADS_URL;
const UserInfoCell: FC<Props> = ({ user }) => (
  <div className="d-flex align-items-center">
    {/* begin:: Avatar */}
    <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
      <a href="#">
        {user.pic ? (
          <div className="symbol-label">
            <img
              src={API_UPLOADS_URL+user.pic.sizes?.small}
              alt={user.name}
              className="w-100"
            />
          </div>
        ) : (
          <div
          // className={clsx(
          //   'symbol-label fs-3',
          //   `bg-light-${user.initials?.state}`,
          //   `text-${user.initials?.state}`
          // )}
          >
            {/* {user.initials?.label} */}
          </div>
        )}
      </a>
    </div>
    <div className="d-flex flex-column">
      <a href="#" className="text-gray-800 text-hover-primary mb-1">
        {user.full_name}
      </a>
      <a href="#" className="text-gray-800 text-hover-primary mb-1">
        {user.username}
      </a>
    </div>
  </div>
);

export {UserInfoCell}
