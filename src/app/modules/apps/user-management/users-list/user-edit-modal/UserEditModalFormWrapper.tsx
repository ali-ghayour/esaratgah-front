import {useQuery} from 'react-query'
import {UserEditModalForm} from './UserEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getUserById} from '../core/_requests'
import { getRoles } from '../../../role-management/roles-list/core/_requests'

const UserEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getUserById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  const { data:roles } = useQuery("roles", () => {
    return (
      getRoles()
    );
  });

  if (!itemIdForUpdate) {
    return <UserEditModalForm isUserLoading={isLoading} user={{_id: undefined}} roles={roles?.data}/>
  }

  if (!isLoading && !error && user) {
    return <UserEditModalForm isUserLoading={isLoading} user={user} roles={roles?.data} />
  }

  return null
}

export {UserEditModalFormWrapper}
