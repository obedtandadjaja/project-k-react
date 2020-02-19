import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import { all as allProperties } from './../../api/properties'
import { all as allMaintenanceRequests, edit } from './../../api/maintenanceRequests'
import Form from './../../components/maintenance_requests/filter'
import { FormStyledComponent } from './../../styledComponents/form'
import TicketTable from '../../components/maintenance_requests/table'

const Style = styled.div`
  .container {
    margin-bottom: 1em;
  }
`

function MaintenanceRequestFilterPage(props) {
  const { 
    allProperties, 
    allMaintenanceRequests, 
    currentUserID, 
    allLoading, 
    editLoading,
    maintenanceRequests, 
    properties, 
  } = props

  const [submitted, setSubmitted] = useState(false)
  const [params, setParams] = useState({})

  useEffect(() => {
    allProperties(currentUserID, { eager: 'Rooms' })
  }, [allProperties, currentUserID])

  useEffect(() => {
    if(submitted)
      allMaintenanceRequests(currentUserID, params)
  }, [editLoading])

  // filter form has no validation method, so everything goes her kind of, based on checkBox value
  const filterSubmit = (values) => {

    let queryParams = {}

    Object.assign(queryParams, { eager: 'Property, Room, Reporter' })

    // here props.match.params = { status: 'pending' } or { status: 'closed' }
    Object.assign(queryParams, props.match.params)

    if(values.hasOwnProperty('date') && values.date.hasOwnProperty('check') && values.date.check) {
      let date
      if(values.date.params === 'before') {
        date = { opened_end_date: values.date.createdAt }
      } else {
        date = { opened_start_date: values.date.createdAt }
      }
      Object.assign(queryParams, date)
    }

    if(values.hasOwnProperty('property') && values.property.hasOwnProperty('check') && values.property.check) {
      Object.assign(queryParams, { property_id: values.property.id })
    }

    if(values.hasOwnProperty('room') && values.room.hasOwnProperty('check') && values.room.check) {
      Object.assign(queryParams, { room_id: values.room.id })
    }

    if(values.hasOwnProperty('category') && values.category.hasOwnProperty('check') && values.category.check) {
      Object.assign(queryParams, { category: values.category.name })
    }
    
    setParams(queryParams)
    setSubmitted(true)
    allMaintenanceRequests(currentUserID, queryParams)
  }

  return(
      <Style>
        <FormStyledComponent>
          <Form 
            properties={properties}
            onSubmit={filterSubmit}
            loading={allLoading}
            />
        </FormStyledComponent>
        <div className='container'>
          <div className='row'>
            {
              maintenanceRequests &&
              <TicketTable
                title='Open Ticket'
                tickets={maintenanceRequests}
                loading={allLoading}
                status={props.match.params.status} />
            }
          </div>
        </div>
      </Style>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
  properties: state.property.getIn(['properties']),
  maintenanceRequests: state.maintenance_request.getIn(['maintenanceRequests']),
  allLoading: state.maintenance_request.getIn(['allLoading']),
  editLoading: state.maintenance_request.getIn(['editLoading'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  allProperties,
  allMaintenanceRequests,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestFilterPage)
