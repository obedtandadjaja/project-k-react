import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from './../actions/authActions'
import './header.css'

import{ Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';

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

  const Hover = styled.div`
    color: white;
    :hover {
      color: white;
      cursor: pointer;
      text-decoration: none;
    }
  `

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/" style={style.title}>PROJECT K</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {
            userLinks.map((link, i) => (
              <Nav.Link key={i} href={link.url}>
                {link.text}
              </Nav.Link>
            ))
          }
          {
            currentUserID &&
            <Nav.Link key='logout' onClick={submitLogout} href='#'>
              Logout
            </Nav.Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default connect(null, null)(Header)
