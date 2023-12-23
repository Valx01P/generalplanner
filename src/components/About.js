import { Link } from 'react-router-dom'

const Public = () => {
  const content = (
    <section className="about__public">
      <header>
        <Link to="/"><h1>G - Planner</h1></Link>
      </header>
      <main className="about__main row-co">
        <div className='init-main'>
          <div className='bottom-space-2'>
            <h1>Welcome to my About Page</h1>
            <p>This website was made with the purpose of practicing full-stack web development
            and incorporates technologies such as MongoDB, Express.js, Node.js, React.js, Redux.js, etc.</p>
          </div>
        </div>
        <div className='side-main'>
          <p>If you'd like to contact me, you can send me an email at</p>
          <h2>pablovaldes0925@gmail.com</h2>
        </div>
        <div className='bottom-main-extra'>
            <h1>Thank You!</h1>
        </div>
          <br />
      </main>
      <footer>
          <Link to="/"><h2>Home</h2></Link>
          <span className='space'> • </span>
          <Link to="/login"><h2>Login</h2></Link>
      </footer>
    </section>
  )
  return content
}

export default Public