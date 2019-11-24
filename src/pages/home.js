import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { get } from './../api/users'
import { all } from './../api/properties'

function HomePage(props) {
  const { loading, error, user, currentUserID, properties, get, all } = props

  useEffect(() => {
    get(currentUserID)
    all(currentUserID)
  }, [get, all, currentUserID])

  console.log(properties)

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
  loading: state.user.getIn(['getLoading']),
  error: state.user.getIn(['getError']),
  user: state.user.getIn(['user']),
  properties: state.property.getIn(['properties']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get,
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
