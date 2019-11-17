import React from 'react'
import { Link } from 'react-router-dom'

function HomePage(props) {
  return (
    <div className='homePage'>
      Content here

      <br />
      <Link to={{ pathname: '/' }}>
        Add a property
      </Link>
    </div>
  )
}

export default HomePage
