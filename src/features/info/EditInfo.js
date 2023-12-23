import { useParams } from 'react-router-dom'
import { useGetInfoQuery } from './infoApiSlice'
import useAuth from '../../hooks/useAuth'
import EditInfoForm from './EditInfoForm'

const EditInfo = () => {
    const { id } = useParams()

    const { isAdmin, username } = useAuth()

    const { info } = useGetInfoQuery("infoList", {
        selectFromResult: ({ data }) => ({
            info: data?.entities[id]
        }),
    })

    if (!info) return "Loading..."
    //making sure the info belongs to the user using the access token data or if they are an admin
    const hasAccess = info.username === username || isAdmin;

    if (!hasAccess) {
      return <p className="errmsg">No access</p>;
    }

    const content = <EditInfoForm info={info} />


    return content
}
export default EditInfo