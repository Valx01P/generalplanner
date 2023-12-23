import { useGetInfoQuery } from "./infoApiSlice"
import Info from "./Info"
import useAuth from "../../hooks/useAuth"

const InfoList = () => {
    
    const { isAdmin, username } = useAuth()
    // console.log('isAdmin:', isAdmin, 'username:', username) //debugging

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

    if (isLoading) content = "Loading..."

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        // console.log('Info Data:', info)                                 //  debugging
        // if (!info?.ids || !info?.entities) {                            //
        //     console.error('Invalid info data structure:', info);        //
        //     return null;                                                //
        // }                                                               //

        const { ids, entities } = info

        let filteredIds
        if (isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(infoId => entities[infoId].username === username)
        }

        // console.log('All IDs:', ids);       //debugging
        // console.log('Filtered IDs:', filteredIds);      //debugging

        // const tableContent = ids?.length && filteredIds.map(infoId => <Info key={infoId} infoId={infoId} />)
        const tableContent = ids?.length && filteredIds.map(infoId => {
            // console.log('Info entity:', entities[infoId]); //debugging
            return <Info key={infoId} infoId={infoId} />;
         });

        content = (
            <table className="info__table">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__created">Created</th>
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
