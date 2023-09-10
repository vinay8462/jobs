import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './Header.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <ul>
        <div className="link-items">
          <li>
            <nav>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </nav>
          </li>

          <li>
            <nav>
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </nav>
          </li>
        </div>
        <li>
          <nav>
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </nav>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
