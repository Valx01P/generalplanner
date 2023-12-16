import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

    const { username, isAdmin } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>
            {/* Dashboard Path URL routing option links */}
            <p><Link to="/dash/contacts">Go to contacts</Link></p>

            <p><Link to="/dash/contacts/new">Add New Contact</Link></p>

            <p><Link to="/dash/income">Go to income</Link></p>

            <p><Link to="/dash/income/new">Add New Income</Link></p>

            <p><Link to="/dash/info">Go to info</Link></p>

            <p><Link to="/dash/info/new">Add New Info</Link></p>

            {(isAdmin) && <p><Link to="/dash/users">Go to users</Link></p>}

            {(isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}


        </section>
    )

    return content
}
export default Welcome