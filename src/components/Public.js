import { Link } from 'react-router-dom'

const Public = () => {
  const content = (
    <>
        <div>Public</div>
        <div>
            <Link to="/login"> Login</Link>
        </div>
    </>
  )
  return content
}

export default Public