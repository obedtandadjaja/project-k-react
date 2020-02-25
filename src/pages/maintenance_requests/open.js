import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import TicketTable from './../../components/maintenance_requests/table'
import MaintenanceRequestsCreateModal from './../../components/maintenance_requests/modal/create'
import MaintenanceRequestsFilterModal from './../../components/maintenance_requests/modal/filter'
import ReturnButton from './../../components/return'
import PageContent from './../../styledComponents/pageContent'
import { allOpen } from './../../api/maintenanceRequests'
import { DEVICE_SIZE } from './../../constants'

const Style = styled.div`
  width: 100%;

  .mr-auto {
    margin-right: auto;
  }

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
  const { currentUserID, openMaintenanceRequests, createLoading, editLoading, allOpenLoading, allOpen } = props

  useEffect(() => {
    allOpen(currentUserID, { eager: 'Property, Room, Reporter', status: 'pending' })
  }, [currentUserID, allOpen, editLoading, createLoading])

  return(
    <PageContent>
      <Style>
        <ReturnButton />
        <div className='container'>
          <div className='row'>
            <div className='mr-auto'>
              <MaintenanceRequestsCreateModal />
            </div>
            <MaintenanceRequestsFilterModal status='pending' />
          </div>
          <div className='row'>
            {
              openMaintenanceRequests &&
              <TicketTable
                title='Open Ticket'
                tickets={openMaintenanceRequests}
                loading={allOpenLoading}
                status='pending' />
            }
          </div>
        </div>
      </Style>
    </PageContent>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
  openMaintenanceRequests: state.maintenance_request.getIn(['openMaintenanceRequests']),
  createLoading: state.maintenance_request.getIn(['createLoading']),
  editLoading: state.maintenance_request.getIn(['editLoading']),
  allOpenLoading: state.maintenance_request.getIn(['allOpenLoading'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  allOpen
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsOpenPage)
