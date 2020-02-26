import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import MaintenanceRequestsFilterModal from '../../components/maintenance_requests/modal/filter'
import TicketTable from './../../components/maintenance_requests/table'
import PageContent from './../../styledComponents/pageContent'
import ReturnButton from './../../components/return'
import { allClosed } from './../../api/maintenanceRequests'
import { DEVICE_SIZE } from './../../constants'

const Style = styled.div`
  width: 100%;

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

function MaintenanceRequestsClosedPage(props) {
  const { currentUserID, closedMaintenanceRequests, editLoading, allClosedLoading, allClose } = props

  useEffect(() => {
    allClosed(currentUserID, { eager: 'Property, Room, Reporter', status: 'closed' })
  }, [currentUserID, allClose, editLoading])

  return(
    <PageContent>
      <Style>
        <ReturnButton />
        <div className='container'>
          <div className='row'>
            <div className='ml-auto'>
              <MaintenanceRequestsFilterModal status='closed' />
            </div>
          </div>
          <div className='row'>
            {
              closedMaintenanceRequests &&
              <TicketTable
                title='Closed Ticket'
                tickets={closedMaintenanceRequests}
                loading={allClosedLoading}
                status='closed' />
            }
          </div>
        </div>
      </Style>
    </PageContent>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
  closedMaintenanceRequests: state.maintenance_request.getIn(['closedMaintenanceRequests']),
  editLoading: state.maintenance_request.getIn(['editLoading']),
  allClosedLoading: state.maintenance_request.getIn(['allClosedLoading'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  allClosed
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsClosedPage)
