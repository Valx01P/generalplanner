import { useGetInfoQuery } from "./infoApiSlice"
import Info from "./Info"
import { isAdmin, username } from "../auth/authSlice"

const InfoList = () => {
    const {
        data: info,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetInfoQuery('infoList', {
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
        const { ids, entities } = info

        let filteredIds
        if (isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(infoId => entities[infoId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(infoId => <Info key={infoId} infoId={infoId} />)

        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__created">Created</th>
                        <th scope="col" className="table__th note__updated">Updated</th>
                        <th scope="col" className="table__th note__status">Username</th>
                        <th scope="col" className="table__th note__title">Title</th>
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
export default InfoList