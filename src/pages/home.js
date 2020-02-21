import React from 'react'

import CardLarge from './../components/commons/cardLarge'
import PageContent from './../styledComponents/pageContent'

function HomePage() {

  return (
    <PageContent>
      <div className='row'>
        <div className='col'>
          <CardLarge
            header='Properties'
            body='Create and Manage Properties'
            color='white'
            clickUrl='/properties/list' />
        </div>
        <div className='col'>
          <CardLarge
            header='Maintenance'
            body='Check Maintenance Progress'
            color='white'
            clickUrl='/maintenance_requests/list' />
        </div>
      </div>
    </PageContent>
  )
  
}

export default HomePage
