import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'

import MaintenanceRequestsFilterModal from '../../components/maintenance_requests/modal/filter'
import TicketTable from './../../components/maintenance_requests/table'
import PageContent from './../../styledComponents/pageContent'
import ReturnButton from './../../components/return'
import { allClosed } from './../../api/maintenanceRequests'

function MaintenanceRequestsClosedPage(props) {
  const { currentUserID, closedMaintenanceRequests, editLoading, allClosedLoading, allClosed } = props

  useEffect(() => {
    allClosed(currentUserID, { eager: 'Property, Room, Reporter', status: 'closed' })
  }, [currentUserID, allClosed, editLoading])

  return(
    <PageContent>
      <Grid container direction='column' justify='center' spacing={4} lg={10}>
        <Grid item>
          <ReturnButton />
        </Grid>
        <Grid item container justify='flex-end'>
          <MaintenanceRequestsFilterModal status='closed' />
        </Grid>
        <Grid item xs>
          {
            closedMaintenanceRequests &&
            <TicketTable
              title='Closed Ticket'
              tickets={closedMaintenanceRequests}
              loading={allClosedLoading}
              status='closed' />
          }
        </Grid>
      </Grid>
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
