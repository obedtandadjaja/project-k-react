import React, { useEffect } from 'react'
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
    edit, 
    currentUserID, 
    loading, 
    maintenanceRequests, 
    properties, 
  } = props

  useEffect(() => {
    allProperties(currentUserID, { eager: 'Rooms' })
  }, [allProperties, currentUserID])

  const filterSubmit = (values) => {

    let queryParams = {}

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

    allMaintenanceRequests(currentUserID, queryParams)
  }

  const closeTicket = (rowData) => {
    const data = { id: rowData.id, status: 'closed' }
    edit(currentUserID, data)
  }

  return(
      <Style>
        <FormStyledComponent>
          <Form 
            properties={properties}
            onSubmit={filterSubmit}
            loading={loading}
            />
        </FormStyledComponent>
        <div className='container'>
          <div className='row'>
            {
              maintenanceRequests &&
              <TicketTable
                title='Open Ticket'
                tickets={maintenanceRequests}
                loading={loading}
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'edit ticket',
                    onClick: (event, rowData) => (props.history.push(`/maintenance_requests/${rowData.id}/edit`))
                  },
                  {
                    icon: 'description',
                    tooltip: 'view ticket',
                    onClick: (event, rowData) => (props.history.push(`/maintenance_requests/${rowData.id}/details`))
                  },
                  {
                    icon: 'delete',
                    tooltip: 'close ticket',
                    onClick: (event, rowData) => {
                      if (window.confirm('Are you sure you want to close this ticket?'))
                        closeTicket(rowData)
                    }
                  },
                ]} />
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
  loading: state.maintenance_request.getIn(['allLoading'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  allProperties,
  allMaintenanceRequests,
  edit
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestFilterPage)