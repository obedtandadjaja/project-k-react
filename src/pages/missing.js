import React from 'react'
import { Link } from 'react-router-dom'

function MissingPage(props) {
  return (
    <div className='missingPage page'>
      Hmmm there is nothing to show here
      &nbsp;
      <Link to={{ pathname: '/' }}>Go back to home?</Link>
    </div>
  )
}

export default MissingPage
