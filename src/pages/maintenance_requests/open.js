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

  .row {
    margin-bottom: 1em;
  }
  
  @media ${DEVICE_SIZE.laptop} {
    .row {
      margin-left: 0.1em;
      margin-right: 0.1em;
    }
  }
`

function MaintenanceRequestsOpenPage(props) {
  const { currentUserID, maintenanceRequests, editLoading, allLoading, all } = props

  useEffect(() => {
    all(currentUserID, { eager: 'Property, Room, Reporter', status: 'pending' })
  }, [currentUserID, all, editLoading])

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
            <div className='ml-auto'>
              <Link className='btn btn-success' to={{ pathname: `/maintenance_requests/${'pending'}/filter` }}>
                Filter
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
                status='pending' />
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
