import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TicketTable from '../../components/maintenance_requests/table'
import { all, edit } from './../../api/maintenanceRequests'
import { DEVICE_SIZE } from './../../constants'

const Style = styled.div`
  .col {
    padding: 0;
  }
  
  .row:first-child {
    margin-top: 2em;
  }

  .btn {
    margin-bottom: 1em;
  }
  
  @media ${DEVICE_SIZE.laptop} {
    .row {
      margin: 0.1em;
    }
    
    .row:last-child {
      margin-bottom: 1em;
    }
  }
`

function MaintenanceRequestsOpenPage(props) {
  const { currentUserID, maintenanceRequests, editLoading, allLoading, all, edit } = props

  useEffect(() => {
    all(currentUserID, { eager: 'Property, Room, Reporter', status: 'pending' })
  }, [currentUserID, all, editLoading])

  const closeTicket = (rowData) => {
    const data = { id: rowData.id, status: 'closed' }
    edit(currentUserID, data)
  }

  return(
    <Style>
      <div className='openTicketPage'>
        <div className='container'>
          <div className='row'>
            <div className='mr-auto'>
              <Link className='btn btn-primary' to={{ pathname: '/maintenance_requests/create' }}>
                Add Ticket
              </Link>
            </div>
          </div>
          <div className='row'>
            {
              maintenanceRequests &&
              <TicketTable
                title='Open Ticket'
                tickets={maintenanceRequests}
                loading={allLoading}
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
      </div>
    </Style>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
  maintenanceRequests: state.maintenance_request.getIn(['maintenanceRequests']),
  editLoading: state.maintenance_request.getIn(['editLoading']),
  allLoading: state.maintenance_request.getIn(['allLoading'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
  edit,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsOpenPage)
