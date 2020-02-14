import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import styled from 'styled-components'

import { logout } from './../actions/authActions'

import './header.css'

const Style = styled.div`
  title: {
    font-family: 'Montserrat';
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
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand as={Link} to='/' >PROJECT K</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            {
              userLinks.map((link, i) => (
                <Nav.Link as={NavLink} key={i} to={link.url}>
                  {link.text}
                </Nav.Link>
              ))
            }
            {
              currentUserID &&
              <Nav.Link as={NavLink} key='logout' onClick={submitLogout} to='#'>
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
