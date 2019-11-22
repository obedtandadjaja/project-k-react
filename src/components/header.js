import React from 'react'
import { Link } from 'react-router-dom'

import './header.css'

function Header(props) {
  const { currentUser } = props
  const userLinks = currentUser ?
    [
      {
        url: `/users/${currentUser.id}`,
        text: 'Account'
      }
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
              <Link key={i} to={{ path: link.url }}>
                { link.text }
              </Link>
            ))
          }
        </div>
      </div>
    </header>
  )
}

export default Header
