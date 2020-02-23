import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TicketTable from '../../components/maintenance_requests/table'
import MaintenanceRequestsCreateModal from './create'
import MaintenanceRequestsFilterModal from './filter'
import { all } from './../../api/maintenanceRequests'
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
  const { currentUserID, maintenanceRequests, createLoading, editLoading, allLoading, all } = props

  useEffect(() => {
    all(currentUserID, { eager: 'Property, Room, Reporter', status: 'pending' })
  }, [currentUserID, all, editLoading, createLoading])

  return(
    <Style>
      <div className='openTicketPage'>
        <div className='container'>
          <div className='row'>
            <div className='mr-auto'>
              <MaintenanceRequestsCreateModal />
            </div>
            <div className='ml-auto'>
              <MaintenanceRequestsFilterModal status='pending' />
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
  createLoading: state.maintenance_request.getIn(['createLoading']),
  editLoading: state.maintenance_request.getIn(['editLoading']),
  allLoading: state.maintenance_request.getIn(['allLoading'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  all
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsOpenPage)
