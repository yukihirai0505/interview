import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.png'
import TwitterAuthButton from './auth/TwitterAuthButton'
import SignOutButton from './auth/SignOutButton'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    this.setState(
      {
        active: !this.state.active,
      },
      () => {
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    const user = this.props.user
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="ステマ！" style={{ width: '88px' }} />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/blog">
                取材一覧
              </Link>
            </div>
            <div className="navbar-item navbar-end has-text-centered">
              {user ? (
                <span>
                  <SignOutButton />
                </span>
              ) : (
                <TwitterAuthButton />
              )}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
