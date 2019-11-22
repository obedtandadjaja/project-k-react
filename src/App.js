import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import HomePage from './pages/home'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import UserGetPage from './pages/users/get'
import UserEditPage from './pages/users/edit'
import UserCreatePage from './pages/users/create'
import PropertyEditPage from './pages/properties/edit'
import RequiresAuth from './higherOrderComponents/requiresAuth'
import { getCurrentUser } from './api/users'
import './App.css'
import './common.css'

function App(props) {
  const { userID } = props
  useEffect(() => {
    userID && getCurrentUser(userID)
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={RequiresAuth(HomePage)} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/signup' component={SignupPage} />
          <Route exact path='/users/create' component={RequiresAuth(UserCreatePage)} />
          <Route exact path='/users/:userID' component={RequiresAuth(UserGetPage)} />
          <Route exact path='/users/:userID/edit' component={RequiresAuth(UserEditPage)} />
          <Route exact path='/properties/:propertyID/edit' component={RequiresAuth(PropertyEditPage)} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = state => ({
  userID: state.auth.getIn(['userID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  getCurrentUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
