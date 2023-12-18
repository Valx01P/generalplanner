import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectInfoById } from './infoApiSlice'

const Info = ({ infoId }) => {

    console.log('Info ID - Info ID:', infoId); //DEBUGGING

    const info = useSelector(state => selectInfoById(state, infoId))
    console.log('Info Component - Info:', info); //DEBUGGING

    const navigate = useNavigate()

    if (info) {
        const created = new Date(info.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(info.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/info/${infoId}`)

        return (
            <tr className="table__row">
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__username">{info.username}</td>
                <td className="table__cell note__title">{info.title}</td>
                <td className="table__cell note__description">{info.description}</td>

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
export default Info