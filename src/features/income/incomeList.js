import { useGetIncomeQuery } from "./incomeApiSlice"
import Income from "./Income"
import useAuth from '../../hooks/useAuth';

const IncomeList = () => {

    const { isAdmin, username } = useAuth()
    
    const {
        data: income,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetIncomeQuery('incomeList', {
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
        const { ids, entities } = income

        let filteredIds
        if (isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(incomeId => entities[incomeId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(incomeId => <Income key={incomeId} incomeId={incomeId} />)


        content = (
            <table className="income__table">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__created">Created</th>
                        <th scope="col" className="table__th note__status">Username</th>
                        <th scope="col" className="table__th note__title">Title</th>
                        <th scope="col" className="table__th note__title">Amount</th>
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
export default IncomeList