import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './components/header'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import MissingPage from './pages/missing'
import AccountGetPage from './pages/account/get'
import AccountEditPage from './pages/account/edit'
import TenantGetPage from './pages/tenants/get'
import TenantEditPage from './pages/tenants/edit'
import TenantCreatePage from './pages/tenants/create'
import RoomGetPage from './pages/rooms/get'
import RoomEditPage from './pages/rooms/edit'
import RoomCreatePage from './pages/rooms/create'
import PropertyGetPage from './pages/properties/get'
import PropertyEditPage from './pages/properties/edit'
import PropertyCreatePage from './pages/properties/create'
import './App.css'
import './common.css'

import Ticket from './pages/tickets'

function App(props) {
  const { currentUserID } = props

  return (
    <div className="App">
      <BrowserRouter>
        <Header currentUserID={currentUserID} />
        <div className='AppBody'>
          <Switch>
            <Route exact path='/signup' component={SignupPage} />
            <Route exact path='/login' component={LoginPage} />
            {
              currentUserID &&
              <Switch>
                <Route exact path='/' component={Ticket} />
                <Route exact path='/account' component={AccountGetPage} />
                <Route exact path='/account/edit' component={AccountEditPage} />
                <Route exact path='/properties/create' component={PropertyCreatePage} />
                <Route exact path='/properties/:propertyID' component={PropertyGetPage} />
                <Route exact path='/properties/:propertyID/edit' component={PropertyEditPage} />
                <Route exact path='/properties/:propertyID/rooms/create' component={RoomCreatePage} />
                <Route exact path='/properties/:propertyID/rooms/:roomID' component={RoomGetPage} />
                <Route exact path='/properties/:propertyID/rooms/:roomID/edit' component={RoomEditPage} />
                <Route exact path='/properties/:propertyID/rooms/:roomID/tenants/create' component={TenantCreatePage} />
                <Route exact path='/properties/:propertyID/rooms/:roomID/tenants/:tenantID' component={TenantGetPage} />
                <Route exact path='/properties/:propertyID/rooms/:roomID/tenants/:tenantID/edit' component={TenantEditPage} />
                <Route component={MissingPage} />
              </Switch>
            }
            <Route path='/' component={LoginPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
})

export default connect(mapStateToProps, null)(App)
