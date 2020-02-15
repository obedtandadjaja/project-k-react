import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav  from 'react-bootstrap/Nav'
import styled from 'styled-components'

import { logout } from './../actions/authActions'
import { COLOR_SCHEME } from './../constants'

import './header.css'

const Style = styled.div`
  .navbar-dark 
  .navbar-brand {
    font-family: 'Montserrat';
    font-size: 1.5em;
  }

  .navbar {
    background-color: ${COLOR_SCHEME.darkGray};
    color: ${COLOR_SCHEME.whitePale};
  }
`

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

  return (
    <Style>
      <Navbar collapseOnSelect expand='lg' variant='dark'>
        <Navbar.Brand as={Link} to='/'>PROJECT K</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            {
              userLinks.map((link, i) => (
                <Nav.Link as={NavLink} to={link.url} key={i}>
                  {link.text}
                </Nav.Link>
              ))
            }
            {
              currentUserID &&
              <Nav.Link as={NavLink} to='#' key='logout' onClick={submitLogout}>
                Logout
              </Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Style>
  )
}

export default connect(null, null)(Header)
