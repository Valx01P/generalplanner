import { Link } from 'react-router-dom'

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <Link to="/"><h1>G - Planner</h1></Link>
      </header>
      <main className="public__main row">
        <div className='init-main'>
          <div className='bottom-space'>
            <h1>Welcome to G - Planner</h1>
            <p>A General Planner to keep track of info, income, and contacts</p>
          </div>
        </div>
        <div className='side-main'>
          <p>If your ready to login-</p>
          <Link to="/login"><button className='cool-btn'><h4>Login</h4></button></Link>
          <p>If you'd like to learn more about this project-</p>
          <Link to="/about"><button className='cool-btn'><h4>About</h4></button></Link>
        </div>
          <br />
      </main>
      <footer>
          <Link to="/login"><h2>Login</h2></Link>
          <span className='space'> • </span>
          <Link to="/about"><h2>About</h2></Link>
      </footer>
    </section>
  )
  return content
}

export default Public