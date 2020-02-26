import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { logout } from './../actions/authActions'

import './header.css'

const Style = styled.div`
  .toolbar {
    display: flex;
    justify-content: space-between;
    background-color: ${(props) => props.theme.palette.background.paper}
  }
  .headerLink {
    text-decoration: none;
    color: ${(props) => props.theme.palette.text.primary};
  }
  .headerLink:hover {
    text-decoration: none;
    color: ${(props) => props.theme.palette.text.primary};
  }
`

function Header(props) {
  const { currentUserID, handleToggleDrawer, drawerOpen } = props
  const unauthenticatedLinks = [
    {
      url: '/about',
      text: 'About'
    },
    {
      url: '/login',
      text: 'Login'
    }
  ]
  const authenticatedLinks = [
      {
        url: `/account`,
        text: 'My Account'
      },
  ]
  const userLinks = currentUserID ? authenticatedLinks : unauthenticatedLinks

  const submitLogout = () => {
    props.dispatch(logout())
    window.location = '/login'
  }

  return (
    <Style>
			<AppBar position='fixed' color='default' className={drawerOpen ? 'shifted' : ''}>
				<Toolbar className='toolbar' bgcolor='palette.background.paper'>
          <Box display='flex' alignItems='center'>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleToggleDrawer}
              edge='start'>
              <MenuIcon />
            </IconButton>
            <Typography component={Link} variant='h5' to={'/'} className='headerLink'>
              Project K
            </Typography>
          </Box>

          <div>
					{
						userLinks.map((link, i) => (
							<Button color='inherit' component={Link} to={link.url} key={i} className='headerLink'>
								{link.text}
							</Button>
						))
					}
					{
						currentUserID &&
						<Button color='inherit' key='logout' onClick={submitLogout}>
							Logout
						</Button>
					}
          </div>
				</Toolbar>
			</AppBar>
    </Style>
  )
}

export default connect(null, null)(Header)
