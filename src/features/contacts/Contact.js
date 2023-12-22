import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetContactsQuery } from './contactsApiSlice'
import { memo } from 'react'

const Contact = ({ contactId }) => {

    const { contact } = useGetContactsQuery("contactsList", {
        selectFromResult: ({ data }) => ({
            contact: data?.entities[contactId]
        }),
    })

    const navigate = useNavigate()

    if (contact) {
        const created = new Date(contact.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(contact.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/contacts/${contactId}`)

        return (
            <tr className="table__row">

                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__username">{contact.username}</td>
                <td className="table__cell note__title">{contact.name}</td>
                <td className="table__cell note__title">{contact.phone}</td>
                <td className="table__cell note__title">{contact.email}</td>
                <td className="table__cell note__title">{contact.description}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedContact = memo(Contact)

export default memoizedContact