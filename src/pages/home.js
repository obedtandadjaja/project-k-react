import React from 'react'

import CardLarge from '../components/commons/cardLarge'

function HomePage() {

  return (
    <div className='home container' style={{ margin: 'auto' }}>
      <div className='row'>
        <div className='col'>
          <CardLarge
            header="Properties"
            body="Create and Manage Properties"
            color="#F89319"
            clickUrl='/properties/list'
          />
        </div>
        <div className='col'>

          <CardLarge
            header="Maintenance"
            body="Check Maintenance Progress"
            color="#5B61DE"
            clickUrl='/maintenance_requests/list'
          />
        </div>
      </div>
    </div>
  )
  
}

export default HomePage
