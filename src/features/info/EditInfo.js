import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectInfoById } from './infoApiSlice'
import EditInfoForm from './EditInfoForm'

const EditInfo = () => {
    const { id } = useParams()

    const info = useSelector(state => selectInfoById(state, id))

    const content = info ? <EditInfoForm info={info} /> : <p>Loading...</p>

    return content
}
export default EditInfo