// TODO(@obedtandadjaja): make the use of api all() scalable

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Button } from '@material-ui/core'

import ReturnButton from './../../components/return'
import Pie from './../../components/maintenance_requests/pie'
import PageContent from './../../styledComponents/pageContent'
import { allOpen, allClosed } from './../../api/maintenanceRequests'

function MaintenanceRequestsListPage(props) {
  const { 
    currentUserID, 
    openMaintenanceRequests,
    closedMaintenanceRequests,
    allOpenLoading,
    allClosedLoading,
    allOpen,
    allClosed,
  } = props

  useEffect(() => {
    allOpen(currentUserID, { eager: 'Property, Room, Reporter', status: 'pending', per_page: 100 })
    allClosed(currentUserID, { eager: 'Property, Room, Reporter', status: 'closed', per_page: 100 })
  }, [allOpen, allClosed, currentUserID])

  return (
    <PageContent>
      <Grid container direction='column' justify='center' spacing={4} lg={10}>
        <Grid item>
          <ReturnButton />
        </Grid>
        <Grid item container direction='row' justify='center' alignItems='center'>
          {
            !allOpenLoading &&
            openMaintenanceRequests &&
            <Grid container item direction='column' alignItems='center' xs md={3} lg={4} spacing={4} style={{ margin: '4em' }}>
              <Grid item>
                <Pie
                  datasets={openMaintenanceRequests} />
              </Grid>
              <Grid item>
                <Link to={{ pathname: '/maintenance_requests/open' }}>
                  <Button variant='contained' color='primary' size='large' type='button' className='customBtn'>
                    OPEN TICKET : {openMaintenanceRequests.length}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          }
          {
            !allClosedLoading &&
            closedMaintenanceRequests &&
            <Grid container item direction='column' alignItems='center' xs md={3} lg={4} spacing={4} style={{ margin: '4em' }}>
              <Grid item>
                <Pie
                  datasets={closedMaintenanceRequests} />
              </Grid>
              <Grid item>
                <Link to={{ pathname: '/maintenance_requests/closed' }}>
                  <Button variant='contained' color='primary' size='large' type='button' className='customBtn'>
                    CLOSED TICKET : {closedMaintenanceRequests.length}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          }
        </Grid>
      </Grid>
    </PageContent>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
  openMaintenanceRequests: state.maintenance_request.getIn(['openMaintenanceRequests']),
  closedMaintenanceRequests: state.maintenance_request.getIn(['closedMaintenanceRequests']),
  allOpenLoading: state.maintenance_request.getIn(['allOpenLoading']),
  allClosedLoading: state.maintenance_request.getIn(['allClosedLoading'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  allOpen,
  allClosed,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsListPage);
