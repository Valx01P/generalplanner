import { useParams } from 'react-router-dom'
import { useGetIncomeQuery } from './incomeApiSlice'
import useAuth from '../../hooks/useAuth'
import EditIncomeForm from './EditIncomeForm'

const EditIncome = () => {
    const { id } = useParams()
    
    const { isAdmin, username } = useAuth()

    const { income } = useGetIncomeQuery("incomeList", {
        selectFromResult: ({ data }) => ({
            income: data?.entities[id]
        }),
    })

    if (!income) return "Loading..."
    //making sure the income belongs to the user using the access token data
    const hasAccess = income.username === username || isAdmin;

    if (!hasAccess) {
      return <p className="errmsg">No access</p>;
    }

    const content = <EditIncomeForm income={income} />


    return content
}
export default EditIncome