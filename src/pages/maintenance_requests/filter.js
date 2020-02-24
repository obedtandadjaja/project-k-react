import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import { all as allProperties } from './../../api/properties'
import { all as allMaintenanceRequests, edit } from './../../api/maintenanceRequests'
import Form from './../../components/maintenance_requests/filter'
import FormStyledComponent from './../../styledComponents/form'
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
  }, [allMaintenanceRequests, currentUserID, editLoading])

  const filterSubmit = (values) => {

    let queryParams = {
      eager: 'Property, Room, Reporter',
      status: props.match.params.status
    }

    if(values.dateOpened && values.dateOpened.check) {
      if(values.dateOpened.params === 'before') {
        queryParams.opened_end_date = values.dateOpened.createdAt 
      } else {
        queryParams.opened_start_date = values.dateOpened.createdAt 
      }
    }

    if(values.property && values.property.check) {
      queryParams.property_id = values.property.id
    }

    if(values.room && values.room.check) {
      queryParams.room_id = values.room.id
    }

    if(values.category && values.category.check) {
      queryParams.category = values.category.name
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
                title={
                  props.match.params.status === 'pending' ? 'Open Ticket' : 'Closed Ticket'
                }
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
