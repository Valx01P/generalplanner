import { useParams } from 'react-router-dom'
import { useGetContactsQuery } from './contactsApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import EditContactForm from './EditContactForm'

const EditContact = () => {
    const { id } = useParams()

    const { username } = useAuth()

    const { contact } = useGetContactsQuery("contactsList", {
        selectFromResult: ({ data }) => ({
            contact: data?.entities[id]
        }),
    })

    if (!contact) return <PulseLoader color={"#FFF"} />
    //making sure the contact belongs to the user using the access token data
    if (contact.username !== username) {
        return <h1>No access</h1>
    }

    const content = <EditContactForm contact={contact} />

    return content
}
export default EditContact