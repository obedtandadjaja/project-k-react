import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'

import TicketTable from './../../components/maintenance_requests/table'
import MaintenanceRequestsCreateModal from './../../components/maintenance_requests/modal/create'
import MaintenanceRequestsFilterModal from './../../components/maintenance_requests/modal/filter'
import ReturnButton from './../../components/return'
import PageContent from './../../styledComponents/pageContent'
import { allOpen } from './../../api/maintenanceRequests'

function MaintenanceRequestsOpenPage(props) {
  const { currentUserID, openMaintenanceRequests, createLoading, editLoading, allOpenLoading, allOpen } = props

  useEffect(() => {
    allOpen(currentUserID, { eager: 'Property, Room, Reporter', status: 'pending' })
  }, [currentUserID, allOpen, editLoading, createLoading])

  return(
    <PageContent> 
      <Grid item container direction='column' justify='center' spacing={4} lg={10}>
        <Grid item>
          <ReturnButton />
        </Grid>
        <Grid item container>
          <Grid item xs={6}>
            <MaintenanceRequestsCreateModal />
          </Grid>
          <Grid item container xs={6} justify='flex-end'>
            <MaintenanceRequestsFilterModal status='pending' />
          </Grid>
        </Grid>
        <Grid item xs>
          {
            openMaintenanceRequests &&
            <TicketTable
              title='Open Ticket'
              tickets={openMaintenanceRequests}
              loading={allOpenLoading}
              status='pending' />
          }
        </Grid>
      </Grid>
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
