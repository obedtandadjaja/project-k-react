import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import { CardStyledComponent } from './../../styledComponents/card'
import { all } from './../../api/properties'

const Style = styled.div`
  h1{
    font-family: 'Open Sans';
    font-weight: bold;
    color: #18A0FB;
  }

  .row{
    margin-bottom: 10em;
  }

  .container{
    margin: 40px auto;
  }

  .container .col {
    margin: 10px;
    flex-grow: 0;
    padding: 0;
  }
`

function PropertyListPage(props) {
  const { currentUserID, properties, all } = props

  useEffect(() => {
    all(currentUserID, { eager: 'Rooms, Users' })
  }, [all, currentUserID])
  
  return (
    <Style>
      <div className='propertyPage'>
        <div className='container' >
          <h1>Your Properties</h1>
          <div className='row'>
            {
              properties &&
              properties.map(property => (
                <div className='col'>
                  <CardStyledComponent>
                    <Link key={property.id} to={{ pathname: `/properties/${property.id}` }}>
                      <h4>{property.name}</h4>
                      <p>Type: {property.type}</p>
                      <p>Address: {property.address}</p>
                      <p>Number of rooms: {property.rooms.length}</p>
                    </Link>
                  </CardStyledComponent>
                </div>
              ))
            }
            <div className='col'>

              <CardStyledComponent>
                <Link to={{ pathname: '/properties/create' }}>
                  Add Property
                </Link>
              </CardStyledComponent>

            </div>
          </div>
        </div>
      </div>
    </Style>
  )
}

const mapStateToProps = state => ({
  properties: state.property.getIn(['properties']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PropertyListPage)
