import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import HomePage from './pages/home'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'

// reenable this when backend is ready to do auth client calls
/* import RequiresAuth from './higherOrderComponents/requiresAuth' */
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/signup' component={SignupPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
