import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from './../actions/authActions'
import './header.css'

function Header(props) {
  const { currentUserID } = props
  const userLinks = currentUserID ?
    [
      {
        url: `/account`,
        text: 'Account'
      },
    ] :
    [
      {
        url: '/about',
        text: 'About'
      },
      {
        url: '/login',
        text: 'Login'
      }
    ]

  const submitLogout = () => {
    props.dispatch(logout())
    window.location = '/login'
  }

  const style = { 
    title: {
      fontFamily: 'Montserrat',
      fontSize: '3rem',
    },
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <p className='navbar-brand' style={style.title}>
          <Link to={{ pathname: '/' }}>
            PROJECT K
          </Link>
        </p>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
        <div className='collapse navbar-collapse' id="navbarToggler">
        <ul className='navbar-nav ml-auto'>
          {
            userLinks.map((link, i) => (
              <li className="nav-item">
                <Link key={i} to={{ pathname: link.url }} className="nav-link">
                  {link.text}
                </Link>
              </li>
            ))
          }
          {
            currentUserID &&
            <li className="nav-item">
              <a className="nav-link" key='logout' onClick={submitLogout} href='#'>
                Logout
            </a>
            </li>
          }
        </ul>
        </div>
    </nav>
  )
}

export default connect(null, null)(Header)
