import { useParams } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import EditUserForm from './EditUserForm'

const EditUser = () => {
    const { id } = useParams()

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })

    if (!user) return "Loading..."

    const content = <EditUserForm user={user} />

    return content
}
export default EditUser