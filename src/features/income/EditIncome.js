import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIncomeById } from './incomeApiSlice'
import EditIncomeForm from './EditIncomeForm'

const EditIncome = () => {
    const { id } = useParams()

    const income = useSelector(state => selectIncomeById(state, id))

    const content = income ? <EditIncomeForm income={income} /> : <p>Loading...</p>

    return content
}
export default EditIncome