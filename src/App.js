import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import HomePage from './pages/home'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import UserGetPage from './pages/users/get'
import UserEditPage from './pages/users/edit'
import UserCreatePage from './pages/users/create'
import PropertyEditPage from './pages/properties/edit'

// reenable this when backend is ready to do auth client calls
/* import RequiresAuth from './higherOrderComponents/requiresAuth' */
import './App.css'
import './common.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/signup' component={SignupPage} />
          <Route exact path='/users/create' component={UserCreatePage} />
          <Route exact path='/users/:userID' component={UserGetPage} />
          <Route exact path='/users/:userID/edit' component={UserEditPage} />
          <Route exact path='/properties/:propertyID/edit' component={PropertyEditPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
