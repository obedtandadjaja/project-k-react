import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Donut from './../../components/charts/donut'
import { all } from './../../api/maintenanceRequests'

function MaintenanceRequestsListPage(props) {
  const { all, currentUserID, maintenanceRequests, loading } = props;

  useEffect(() => {
    all(currentUserID, { eager: 'Property, Room, Reporter' })
  }, [currentUserID, all])

  const style = {
    card: {
      width: '300px',
      height: '550px',
      margin: '1.5rem',
      textAlign: 'center',
    },
    button: {
      width: '225px',
      height: '100px',
      marginTop: '2rem',
      fontFamily: 'Open Sans',
      fontSize: '20px',
      boxShadow: '0 10px 8px 0 rgba(0, 0, 0, 0.2), 0 0 20px 0 rgba(0, 0, 0, 0.19' 
    },
    margin: {
      marginTop: '40px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  }

  return (
    <div className="container" style={style.margin}>
      <div className='row'>
        <div className='col'>
          <div style={style.card}>
            {
              !loading &&
              maintenanceRequests && 
              <>
                <Donut
                  datasets={maintenanceRequests}
                  filter='pending'
                />
                <Link to={{ pathname: "/maintenance_requests/open" }}>
                  <button type='button' className="btn btn-primary" style={style.button}>
                    OPEN TICKET
                  </button>
                </Link>
              </>
            }
          </div>
        </div>
        <div className='col'>
          <div style={style.card}>
            {
              !loading &&
              maintenanceRequests &&
              <>
                <Donut
                  datasets={maintenanceRequests}
                  filter='closed'
                />
                <Link to={{ pathname: "/maintenance_requests/closed" }}>
                  <button type='button' className="btn btn-primary" style={style.button}>
                    CLOSE TICKET
                  </button>
                </Link>
              </>
            }
          </div>
        </div>
      </div>
    </div>
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
