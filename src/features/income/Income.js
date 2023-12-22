import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetIncomeQuery } from './incomeApiSlice'
import { memo } from 'react'

const Income = ({ incomeId }) => {


    const { income } = useGetIncomeQuery("incomeList", {
        selectFromResult: ({ data }) => ({
            income: data?.entities[incomeId]
        }),
    })

    const navigate = useNavigate()

    if (income) {
        const created = new Date(income.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(income.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/income/${incomeId}`)

        return (
            <tr className="table__row">
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__title">{income.username}</td>
                <td className="table__cell note__username">{income.title}</td>
                <td className="table__cell note__username">{income.amount}</td>
                <td className="table__cell note__username">{income.description}</td>

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

const memoizedIncome = memo(Income)

export default memoizedIncome
