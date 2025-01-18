import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import { UserPhoneNumberCell } from "./UserPhoneNumberCell";
// import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import { UserStatusCell } from './UserStatusCell'
import {User} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: "_id",
    Cell: ({ ...props }) => (
      <UserSelectionCell id={props.data[props.row.index]._id} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Full Name"
        className="min-w-125px"
      />
    ),
    id: "fullName",
    Cell: ({ ...props }) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader
  //       tableProps={props}
  //       title="Family"
  //       className="min-w-125px"
  //     />
  //   ),
  //   id: "family",
  //   Cell: ({ ...props }) => <UserInfoCell user={props.data[props.row.index].family} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Phone number"
        className="min-w-125px"
      />
    ),
    id: "phone_number",
    Cell: ({ ...props }) => (
      <UserPhoneNumberCell
        phone_number={props.data[props.row.index].phone_number}
      />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Role"
        className="min-w-125px"
      />
    ),
    accessor: (row) => row.role?.name,
    id: "role",
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Status"
        className="min-w-125px"
      />
    ),
    id: "status",
    // accessor : 'status'
    Cell: ({ ...props }) => (
      <UserStatusCell status={props.data[props.row.index].status} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Actions"
        className="text-end min-w-100px"
      />
    ),
    id: "actions",
    Cell: ({ ...props }) => (
      <UserActionsCell id={props.data[props.row.index]._id} />
    ),
  },
];

export {usersColumns}
