import { Link } from 'react-router-dom'

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome!</h1>
            {/* Dashboard Path URL routing option links */}
            <p><Link to="/dash/contacts">Go to contacts</Link></p>

            <p><Link to="/dash/income">Go to income</Link></p>

            <p><Link to="/dash/info">Go to info</Link></p>

            <p><Link to="/dash/plans">Go to plans</Link></p>

            <p><Link to="/dash/users">Go to users</Link></p>

        </section>
    )

    return content
}
export default Welcome