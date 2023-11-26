import { useGetPlansQuery } from "./plansApiSlice"
import Plan from "./Plan"

const PlansList = () => {
    const {
        data: plans,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPlansQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = plans

        const tableContent = ids?.length
            ? ids.map(planId => <Plan key={planId} planId={planId} />)
            : null

        content = (
            <table className="table table--plans">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Created</th>
                        <th scope="col" className="table__th note__created">Updated</th>
                        <th scope="col" className="table__th note__updated">Username</th>
                        <th scope="col" className="table__th note__title">Description</th>
                        <th scope="col" className="table__th note__username">Date</th>
                        <th scope="col" className="table__th note__edit">Delete</th>
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
export default PlansList