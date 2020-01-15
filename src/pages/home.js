import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { all } from './../api/properties'

import { CardStyle } from '../style/styleHelpers'

function HomePage(props) {
  const { currentUserID, properties, all } = props

  useEffect(() => {
    all(currentUserID, { eager: true })
  }, [all, currentUserID])

  const style = {
    margin: '40px 0 0 2rem',
  }

  return (
    <div className='container' style={style}>
      <h1>Your Properties</h1>
        <div className='row'>
        {
          properties &&
          properties.map(property => (
            <div className='col'>
              
              <CardStyle>
                <Link key={property.id} to={{ pathname: `/properties/${property.id}` }}>
                  <h4>{ property.name }</h4>
                  <p>Type: { property.type }</p>
                  <p>Address: { property.address }</p>
                  <p>Number of rooms: { property.rooms.length }</p>
                </Link>
              </CardStyle>
              
            </div>
            ))
          }
        <div className='col'>
          
          <CardStyle>
            <Link to={{ pathname: '/properties/create' }}>
              Add Property
            </Link>
          </CardStyle>
          
        </div>
      </div>
      <h1>Your Tickets</h1>
      <div className='row'>
        <div className='col'>
          <Link >
            My Tickets
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  properties: state.property.getIn(['properties']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
