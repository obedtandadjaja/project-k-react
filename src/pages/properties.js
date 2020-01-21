import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { all } from './../api/properties'

import { CardStyle } from '../components/com/cardStyle'

function PropertyPage(props) {
  const { currentUserID, properties, all } = props

  useEffect(() => {
    all(currentUserID, { eager: 'Rooms, Users' })
  }, [all, currentUserID])

  const style = {

    title: {
      fontFamily: 'Open Sans',
      fontWeight: 'bold',
      color: '#18A0FB',
    },

    mb: {
      marginBottom: '10em',
    }
  }

  return (
    <div className='propertyPage'>
      <div className='container' >
        <h1 style={style.title}>Your Properties</h1>
        <div className='row' style={style.mb}>
          {
            properties &&
            properties.map(property => (
              <div className='col'>

                <CardStyle>
                  <Link key={property.id} to={{ pathname: `/properties/${property.id}` }}>
                    <h4>{property.name}</h4>
                    <p>Type: {property.type}</p>
                    <p>Address: {property.address}</p>
                    <p>Number of rooms: {property.rooms.length}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(PropertyPage)
