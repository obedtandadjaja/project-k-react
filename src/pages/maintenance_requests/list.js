import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import Doughnut from './../../components/maintenance_requests/doughnut'
import { all } from './../../api/maintenanceRequests'

const Style = styled.div`
  .container{
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    max-width: 960px;
  }

  .box{
    width: 300px;
    height: 550px;
    margin: 1.5rem;
    text-align: center;
    margin: auto;
  }
  
  .customBtn{
    width: 225px;
    height: 75px;
    margin-top: 2rem;
    font-family: Open Sans;
    font-size: 20px;
    border-radius: 4em;
    box-shadow: 0 10px 8px 0 rgba(0, 0, 0, 0.2), 0 0 20px 0 rgba(0, 0, 0, 0.19);
  }
`

function MaintenanceRequestsListPage(props) {
  const { currentUserID, maintenanceRequests, loading, all } = props;

  // fetch all maintenance_requests and pass it to children donut,
  // then let donut's props.filter calculates on status(filter='status')
  useEffect(() => {
    all(currentUserID, { eager: 'Property, Room, Reporter', per_page: 100 })
  }, [all, currentUserID])

  return (
    <Style>
      <div className='container'>
        <div className='row'>
          <div className='box'>
            {
              !loading &&
              maintenanceRequests && 
              <>
                <Doughnut
                  datasets={maintenanceRequests}
                  filter='pending' />

                <Link to={{ pathname: '/maintenance_requests/open' }}>
                  <button type='button' className='customBtn btn-primary'>
                    OPEN TICKET
                  </button>
                </Link>
              </>
            }
          </div>
          <div className='box'>
            {
              !loading &&
              maintenanceRequests &&
              <>
                <Doughnut
                  datasets={maintenanceRequests}
                  filter='closed' />
                  
                <Link to={{ pathname: '/maintenance_requests/closed' }}>
                  <button type='button' className='customBtn btn-primary'>
                    CLOSE TICKET
                  </button>
                </Link>
              </>
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
  loading: state.maintenance_request.getIn(['allLoading'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsListPage);
