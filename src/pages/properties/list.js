import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Box, Typography } from '@material-ui/core'

import CardStyledComponent from './../../styledComponents/card'
import PageContent from './../../styledComponents/pageContent'
import { all } from './../../api/properties'

function PropertyListPage(props) {
  const { currentUserID, properties, all } = props

  useEffect(() => {
    all(currentUserID, { eager: 'Rooms, Users' })
  }, [all, currentUserID])

  return (
    <PageContent>
      <Box width={1} alignItems='flex-start'>
        <h1>Your Properties</h1>
        <div className='row'>
          {
            properties &&
            properties.map(property => (
              <div className='col' key={property.id}>
                <CardStyledComponent 
                  display='inline-block'
                  alignItems='flex-start'
                  alignContent='flex-start'
                  justifyContent='flex-start'
                  p={3}>
                  <Link to={{ pathname: `/properties/${property.id}` }}>
                    <Typography variant='h5' pb={2}>{property.name}</Typography>
                  </Link>
                  <Typography color='textPrimary'>Type: {property.type}</Typography>
                  <Typography color='textPrimary'>Address: {property.address}</Typography>
                  <Typography color='textPrimary'>Number of rooms: {property.rooms.length}</Typography>
                </CardStyledComponent>
              </div>
            ))
          }
          <div className='col'>
            <Link to={{ pathname: '/properties/create' }}>
              <CardStyledComponent display='inline-block' p={3}>
                  Add Property
              </CardStyledComponent>
            </Link>
          </div>
        </div>
      </Box>
    </PageContent>
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
