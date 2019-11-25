import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { all } from './../api/properties'

function HomePage(props) {
  const { currentUserID, properties, all } = props

  useEffect(() => {
    all(currentUserID, { eager: true })
  }, [all, currentUserID])

  return (
    <div className='homePage'>
      <div>
        <h1>Your properties</h1>
        {
          properties &&
          properties.map(property => (
            <Link key={property.id} to={{ pathname: `/properties/${property.id}` }}>
              <div className='card'>
                <h4>{ property.name }</h4>
                <p>Type: { property.type }</p>
                <p>Address: { property.address }</p>
                <p>Number of rooms: { property.rooms.length }</p>
              </div>
            </Link>
          ))
        }
      </div>
      <Link to={{ pathname: '/properties/create' }}>
        Add a property
      </Link>
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
