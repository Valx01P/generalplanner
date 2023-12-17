import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIncomeById } from './incomeApiSlice'
import EditIncomeForm from './EditIncomeForm'

const EditIncome = () => {
    const { id } = useParams()

    const Income = useSelector(state => selectIncomeById(state, id))

    const content = Income ? <EditIncomeForm Income={Income} /> : <p>Loading...</p>

    return content
}
export default EditIncome