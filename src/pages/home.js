import React from 'react'
import { Link } from 'react-router-dom'

import { logout } from './../actions/authActions'

function HomePage(props) {
  const submitLogout = () => {
    props.dispatch(logout())
    props.history.push('/login')
  }

  return (
    <div className='homePage'>
      Content here

      <button onClick={submitLogout}>Logout</button>

      <br />
      <Link to={{ pathname: '/' }}>
        Add a property
      </Link>
    </div>
  )
}

export default HomePage
