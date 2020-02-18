import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import TicketTable from './../../components/maintenance_requests/table'
import { all, edit } from './../../api/maintenanceRequests'
import { DEVICE_SIZE } from './../../constants'

const Style = styled.div`
  .col{
    padding: 0;
  }
  
  .row:first-child {
    margin-top: 2em;
  }

  .row {
    margin-bottom: 1em;
  }

   @media ${DEVICE_SIZE.laptop} {
    .row {
      margin-left: 0.1em;
      margin-right: 0.1em;
      margin-bottom: 1em;
    }
  }
`

function MaintenanceRequestsClosedPage(props) {
  const { currentUserID, maintenanceRequests, editLoading, allLoading, all, edit } = props

  useEffect(() => {
    all(currentUserID, { eager: 'Property, Room, Reporter', status: 'closed' })
  }, [currentUserID, all, editLoading])

  const openTicket = (rowData) => {
    const data = { id: rowData.id, status: 'pending' }
    edit(currentUserID, data)
  }

  return(
    <Style>
      <div className='closeTicketPage'>
        <div className='container'>
          <div className='row'>
            <div className='ml-auto'>
              <Link className='btn btn-success' to={{ pathname: '/maintenance_requests/filter' }}>
                Filter
              </Link>
            </div>
          </div>
          <div className='row'>
            {
              maintenanceRequests && 
              <TicketTable
                title='Closed Ticket'
                tickets={maintenanceRequests}
                loading={allLoading}
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'edit ticket',
                    onClick: (event, rowData) => (props.history.push(`/maintenance_requests/${rowData.id}/edit`)),
                  },
                  {
                    icon: 'description',
                    tooltip: 'view ticket',
                    onClick: (event, rowData) => (props.history.push(`/maintenance_requests/${rowData.id}/details`))
                  },
                  {
                    icon: 'add_box',
                    tooltip: 'open ticket',
                    onClick: (event, rowData) => {
                      if (window.confirm('Are you sure you want to reopen this ticket?'))
                        openTicket(rowData)
                    },
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

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsClosedPage)
