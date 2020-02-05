import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Donut from './../../components/charts/donut'
import { all } from '../../api/maintenances'

function MaintenanceRequestsListPage(props) {
  const { all, currentUserID, maintenances} = props;
  const [pending, setPending] = useState( );
  const [closed, setClosed] = useState( );

  useEffect(() => {
    all(currentUserID)
  }, [currentUserID, all])

  useEffect(() => {
    if (maintenances.length !== 0) {
      setDataForTicket(maintenances)
    }
    
    function setDataForTicket(data) {
      setPending(splitByStatus(data, 'pending'))
      setClosed(splitByStatus(data, 'closed'))
    }

    function splitByStatus(maintenances, status) {
      var arr = []
      var label = []
      var data = []

      maintenances.map(ticket => {
        if (ticket.status === status) {
          return arr.push(ticket.title)
        }
      })

      arr.sort()

      if (arr.length > 0) {
        var tmp = arr[0]
        label.push(tmp)
        var count = 0
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] !== tmp) {
            tmp = arr[i]
            label.push(tmp)
            data.push(count)
            count = 0
          }
          count = count + 1;
        }
        data.push(count)
      }

      return ({ labels: label, data: data, count: arr.length })
    }

  }, [maintenances])
  
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
              pending && 
              <>
              <Donut
                datasets={pending}
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
              closed &&
              <>
              <Donut
                datasets={closed}
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
  maintenances: state.maintenance.getIn(['maintenances'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsListPage);
