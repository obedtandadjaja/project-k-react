// TODO(@obedtandadjaja): make the use of api all() scalable

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

import ReturnButton from './../../components/return'
import Pie from './../../components/maintenance_requests/pie'
import PageContent from './../../styledComponents/pageContent'
import { allOpen, allClosed } from './../../api/maintenanceRequests'
import { DEVICE_SIZE, COLOR_SCHEME } from './../../constants'

const Style = styled.div`
  width: 100%;
  
  .container {
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    max-width: 960px;
  }

  .box {
    width: 300px;
    height: 550px;
    margin: 1.5rem;
    text-align: center;
    margin: auto;
  }
  
  .customBtn {
    padding: 1em;
    height: 75px;
    color: ${COLOR_SCHEME.white};
    background: ${COLOR_SCHEME.blue};
    margin-top: 2rem;
    font-family: Open Sans;
    font-size: 20px;
    border-radius: 4em;
    box-shadow: 0 10px 8px 0 rgba(0, 0, 0, 0.2), 0 0 20px 0 rgba(0, 0, 0, 0.19);
  }

  .customBtn:hover {
    background: ${COLOR_SCHEME.lightBlue};
    color: ${COLOR_SCHEME.blue};
  }

  @media ${DEVICE_SIZE.mobileL} {
    .customBtn {
      box-shadow: none;
    }
  }
`

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
      <Style>
        <ReturnButton />
        <div className='container'>
          <div className='row'>
            <div className='box'>
              {
                !allOpenLoading &&
                openMaintenanceRequests &&
                <>
                  <Pie
                    datasets={openMaintenanceRequests} />

                  <Link to={{ pathname: '/maintenance_requests/open' }}>
                    <Button type='button' className='customBtn'>
                      OPEN TICKET : {openMaintenanceRequests.length}
                    </Button>
                  </Link>
                </>
              }
            </div>
            <div className='box'>
              {
                !allClosedLoading &&
                closedMaintenanceRequests &&
                <>
                  <Pie
                    datasets={closedMaintenanceRequests} />

                  <Link to={{ pathname: '/maintenance_requests/closed' }}>
                    <Button type='button' className='customBtn'>
                      CLOSED TICKET : {closedMaintenanceRequests.length}
                    </Button>
                  </Link>
                </>
              }
            </div>
          </div>
        </div>
      </Style>
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
