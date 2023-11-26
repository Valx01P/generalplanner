import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectPlanById } from './plansApiSlice'

const Plan = ({ planId }) => {

    const plan = useSelector(state => selectPlanById(state, planId))

    const navigate = useNavigate()

    if (plan) {
        const created = new Date(plan.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(plan.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleDelete = () => {}//todo

        return (
            <tr className="table__row">
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__title">{plan.username}</td>
                <td className="table__cell note__title">{plan.description}</td>
                <td className="table__cell note__username">{plan.date}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleDelete}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Plan