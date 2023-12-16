import { useGetContactsQuery } from "./contactsApiSlice"
import Contact from "./contact"
import { isAdmin, username } from "../auth/authSlice"

const ContactsList = () => {
    const {
        data: contacts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetContactsQuery('contactList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = contacts

        let filteredIds
        if (isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(contactId => entities[contactId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(contactId => <Contact key={contactId} contactId={contactId} />)


        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__created">Created</th>
                        <th scope="col" className="table__th note__updated">Updated</th>
                        <th scope="col" className="table__th note__status">Username</th>
                        <th scope="col" className="table__th note__title">Name</th>
                        <th scope="col" className="table__th note__title">Phone</th>
                        <th scope="col" className="table__th note__title">Email</th>
                        <th scope="col" className="table__th note__username">Description</th>
                        <th scope="col" className="table__th note__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default ContactsList