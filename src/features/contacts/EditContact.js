import { useParams } from 'react-router-dom'
import { useGetContactsQuery } from './contactsApiSlice'
import useAuth from '../../hooks/useAuth'
import EditContactForm from './EditContactForm'

const EditContact = () => {
    const { id } = useParams()

    const { isAdmin, username } = useAuth()

    const { contact } = useGetContactsQuery("contactsList", {
        selectFromResult: ({ data }) => ({
            contact: data?.entities[id]
        }),
    })

    if (!contact) return "Loading..."
    //making sure the contact belongs to the user using the access token data
    const hasAccess = contact.username === username || isAdmin;

    if (!hasAccess) {
      return <p className="errmsg">No access</p>;
    }

    const content = <EditContactForm contact={contact} />

    return content
}
export default EditContact