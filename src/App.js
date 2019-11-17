import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import RequiresAuth from './higherOrderComponents/requiresAuth'
import HomePage from './pages/home'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={RequiresAuth(HomePage)} />
      </BrowserRouter>
    </div>
  );
}

export default App;
