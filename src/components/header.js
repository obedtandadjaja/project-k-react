import React from 'react'
import { Link } from 'react-router-dom'

import { logout } from './../actions/authActions'
import './header.css'

function Header(props) {
  const { currentUser } = props
  const userLinks = currentUser ?
    [
      {
        url: `/users/${currentUser.id}`,
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
    props.history.push('/login')
  }

  return (
    <header>
      <div className='header'>
        <h1 className='temporaryTitle'>
          <Link to={{ pathname: '/' }}>
            Project K
          </Link>
        </h1>
        <div className='linksContainer'>
          {
            userLinks.map((link, i) => (
              <Link key={i} to={{ pathname: link.url }}>
                { link.text }
              </Link>
            ))
          }
          <a key='logout' onClick={submitLogout} href='#'>
            Logout
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
