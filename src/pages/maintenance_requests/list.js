// TODO(@obedtandadjaja): make the use of api all() scalable

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

import ReturnButton from './../../components/return'
import Pie from './../../components/maintenance_requests/pie'
import PageContent from './../../styledComponents/pageContent'
import { all } from './../../api/maintenanceRequests'
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
  const { currentUserID, maintenanceRequests, loading, all } = props
  const [trigger, setTrigger] = useState(false)
  const [fetch, setFetch] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [pending, setPending] = useState(null)
  const [closed, setClosed] = useState(null)

  // (@kenaszogara): this is the only implementation I can think of...
  // It let us use mainteannceRequests to hold both pending and closed data
  // Updating the maintenanceRequests in the next page, wont affect doughnut on return
  // fetch maintenance_requests based on status and pass it to state => pending or closed
  useEffect(() => {
    all(currentUserID, { eager: 'Property, Room, Reporter', status: 'pending', per_page: 100 })
    setFetch(true)
  }, [all, currentUserID])

  // watch pending, if its filled, set trigger to true
  useEffect(() => {
    if (pending) {
      all(currentUserID, { eager: 'Property, Room, Reporter', status: 'closed', per_page: 100 })
      setFetch(true)
      setTrigger(true)
    }
  }, [all, currentUserID, pending])

  // watch maintenanceRequests: wether if the state is alredy updated
  // then store the updated token
  useEffect(() => {
    if (!loading && !updated && fetch){
      setUpdated(true)
    }
  }, [maintenanceRequests])

  // once maintenanceRequests is updated
  useEffect(() => {
    if (updated && !trigger && !pending) {
      setPending(maintenanceRequests)
      setUpdated(false)
    }

    if (updated && trigger && !closed) {
      setClosed(maintenanceRequests)
    }
  }, [updated])

  return (
    <PageContent>
      <Style>
        <ReturnButton />
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
                    <Button type='button' className='customBtn'>
                      OPEN TICKET : {pending.length}
                    </Button>
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
                    <Button type='button' className='customBtn'>
                      CLOSED TICKET : {closed.length}
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
  maintenanceRequests: state.maintenance_request.getIn(['maintenanceRequests']),
  loading: state.maintenance_request.getIn(['allLoading'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsListPage);
