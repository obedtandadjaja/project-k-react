import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { all } from '../api/maintenance'

import Donut from '../components/charts/donut'

import {bgColor} from '../components/charts/mockdata'

function MaintenancePage(props) {
  const { all, currentUserID,} = props;
  const [pending, setPending] = useState( );
  const [closed, setClosed] = useState( );

  useEffect(() => {
    fetchTicket()
  }, [currentUserID, all])

  
  async function fetchTicket() {
    const dispatch = await all(currentUserID)
    setPending(splitByStatus(dispatch.payload, 'pending'))
    setClosed(splitByStatus(dispatch.payload, 'closed' ))
  }


  function splitByStatus(maintenances, status) {
    var arr = []
    var label = []
    var data = []

    // get ticket by status
    maintenances.map(ticket => {
      if (ticket.status === status) {
        arr.push(ticket.title)
      }
    })

    arr.sort()

    if(arr.length > 0) {
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

    return({ labels: label, data: data, count: arr.length })
  }

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
                color={bgColor}
              />
              <Link to={{ pathname: "/maintenance/open" }}>
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
                color={bgColor}
              />
              <Link to={{ pathname: "/maintenance/close" }}>
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
})

const mapDispatchToProps = dispatch => bindActionCreators({
  all,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(MaintenancePage);
