import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import CardLarge from '../style/cardLarge'

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className='home container' style={{margin: 'auto'}}> 
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
                to='/ticket'
              />
            </div>
        </div>
      </div>
    )
  }
  
}

export default HomePage
