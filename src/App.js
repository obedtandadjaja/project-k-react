import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core'

import Header from './components/header'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import AuthenticatedRoutes from './authenticatedRoutes'
import AppDrawer from './drawer'
import { DEVICE_SIZE } from './constants.js'

import './App.css'
import './common.css'

const drawerWidth = 200
const StyledApp = styled.div`
  background-color: ${(props) => props.theme.palette.background.default};
  height: 100%;
  width: 100%;

  .shifted {
    width: calc(100% - ${drawerWidth}px);
    margin-left: ${drawerWidth}px;
    transition: margin ${(props) => props.theme.transitions.duration.enteringScreen}ms;
  }

  @media ${DEVICE_SIZE.mobileL} {
    .shifted {
      width: 100%;
      margin-left: 0;
      transition: none;
    }
  }
`

function App(props) {
  const { currentUserID } = props
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const closeDrawer = () => {
    setDrawerOpen(false)
  }
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen)
  }

  const getTheme = (theme) => {
    return createMuiTheme({
      ...theme,
      palette: {
        type: theme.paletteType,
        background: {
          default: theme.paletteType === 'dark' ? '#212121' : '#f0f2f5',
          paper: theme.paletteType === 'dark' ? '#424242' : '#fff',
        }
      }
    })
  }
  const theme = getTheme({
    space: 5,
    paletteType: 'light',
    typography: {
      button: {
        textTransform: 'none'
      }
    }
  })

  // This ugly StylesProvider, MuiThemeProvider, and ThemeProvider layering is the
  // recommended way of using themes and styled-components together. For more
  // information see: https://github.com/mui-org/material-ui/issues/10098
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <StyledApp>
            <BrowserRouter>
              <Header 
                currentUserID={currentUserID}
                drawerOpen={isDrawerOpen}
                handleToggleDrawer={toggleDrawer} />
              <div className='AppBody'>
                <Switch>
                  <Route exact path='/signup' component={SignupPage} />
                  <Route exact path='/login' component={LoginPage} />
                  {
                    currentUserID &&
                    <>
                      <AppDrawer open={isDrawerOpen} handleToggleDrawer={toggleDrawer} width={drawerWidth} />
                      <main
                        className={isDrawerOpen ? 'shifted' : ''}
                        onClick={ window.innerWidth <= 425 ? closeDrawer : null }>
                        <AuthenticatedRoutes />
                      </main>
                    </>
                  }
                  <Route path='/' component={LoginPage} />
                </Switch>
              </div>
            </BrowserRouter>
          </StyledApp>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
})

export default connect(mapStateToProps, null)(App)
