import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import HomePage from './pages/home'
import LoginPage from './pages/login'
import RequiresAuth from './higherOrderComponents/requiresAuth'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={RequiresAuth(HomePage)} />
        <Route exact path='/login' component={LoginPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
