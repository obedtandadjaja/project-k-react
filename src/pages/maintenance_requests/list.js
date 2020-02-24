// TODO(@obedtandadjaja): make the use of api all() scalable

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import Pie from './../../components/maintenance_requests/pie'
import { all } from './../../api/maintenanceRequests'
import { DEVICE_SIZE, COLOR_SCHEME } from './../../constants'

const Style = styled.div`
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
  const { currentUserID, maintenanceRequests, loading, all } = props
  const [trigger, setTrigger] = useState(false)
  const [pending, setPending] = useState(null)
  const [closed, setClosed] = useState(null)

  // fetch maintenance_requests based on status and pass it to state => pending or closed
  useEffect(() => {
    all(currentUserID, { eager: 'Property, Room, Reporter', status: 'pending', per_page: 100 })
  }, [all, currentUserID])

  useEffect(() => {
    if (trigger) {
      all(currentUserID, { eager: 'Property, Room, Reporter', status: 'closed', per_page: 100 })
      console.log('pass')
    }
  }, [all, currentUserID, trigger])

  useEffect(() => {
    if (!loading && !trigger && maintenanceRequests.length !== 0) {
      setPending(maintenanceRequests)
      setTrigger(true)
    }

    if (!loading && trigger) {
      setClosed(maintenanceRequests)
    }
  }, [loading])

  return (
    <Style>
      <div className='container'>
        <div className='row'>
          <div className='box'>
            {
              !loading &&
              pending &&
              <>
                <Pie
                  datasets={pending} />

                <Link to={{ pathname: '/maintenance_requests/open' }}>
                  <button type='button' className='customBtn'>
                    OPEN TICKET : {pending.length}
                  </button>
                </Link>
              </>
            }
          </div>
          <div className='box'>
            {
              !loading &&
              closed &&
              <>
                <Pie
                  datasets={closed} />
                  
                <Link to={{ pathname: '/maintenance_requests/closed' }}>
                  <button type='button' className='customBtn'>
                    CLOSED TICKET : {closed.length}
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
