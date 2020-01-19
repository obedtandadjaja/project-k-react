import React from 'react'

import CardLarge from '../components/com/cardLarge'

function HomePage() {

  return (
    <div className='home container' style={{ margin: 'auto' }}>
      <div className='row'>
        <div className='col'>
          <CardLarge
            header="Properties"
            body="Create and Manage Properties"
            color="#F89319"
            to='/properties'
          />
        </div>
        <div className='col'>

          <CardLarge
            header="Maintenance"
            body="Check Maintenance Progress"
            color="#5B61DE"
            to='/maintenance'
          />
        </div>
      </div>
    </div>
  )
  
}

export default HomePage
