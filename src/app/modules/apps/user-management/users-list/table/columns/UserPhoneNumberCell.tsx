import {FC} from 'react'

type Props = {
  phone_number?: string
}

const UserPhoneNumberCell: FC<Props> = ({ phone_number }) => (
  <div className="badge badge-light fw-bolder">{phone_number}</div>
);

export {UserPhoneNumberCell}
