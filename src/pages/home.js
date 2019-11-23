import React from 'react'
import { Link } from 'react-router-dom'

function HomePage(props) {
  return (
    <div className='homePage'>
      <Link to={{ pathname: '/properties/create' }}>
        Add a property
      </Link>
    </div>
  )
}

export default HomePage
