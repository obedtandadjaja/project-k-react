import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { all } from '../api/maintenance'

import Donut from '../components/charts/donut'

import {closedTicket, closedTicketLabel, openTicket, bgColor} from '../components/charts/mockdata'

function MaintenancePage(props) {
  const { all, currentUserID,} = props;
  const [pendingLabel, setPendingLabel] = useState([]);
  const [pendingData, setPendingData] = useState([]);

  const [closed, setClosed] = useState([]);

  // var d = [pendingLabel];
  // var l = [pendingData]

  useEffect(() => {
    fetchTicket()
  }, [currentUserID, all])
  
  async function fetchTicket() {
    const dispatch = await all(currentUserID)
    seperateTicket(dispatch.payload)
  }


  // seperate ticket based on status
  function seperateTicket(value) {

    // open
    var label_o = []
    var labelOpen = []
    var dataOpen = []
    
    //close
    var label_c = []
    var labelClose = []
    var dataClose = []

    // get label
    value.map(ticket => {
      if(ticket.status === 'pending'){
        label_o.push(ticket.title)
      } else {
        label_c.push(ticket.title)
      }
    })

    // this is for open ticket logic
    // sort labels
    label_o.sort();

    var tmp = label_o[0]
    labelOpen.push(tmp)
    var count = 0
    // if label match add 
    for (var i = 0; i < label_o.length; i++) {
      if (label_o[i] !== tmp){
        tmp = label_o[i]
        labelOpen.push(tmp)
        dataOpen.push(count)
        count = 0
      }
      count = count + 1;
    }
    dataOpen.push(count)


    //this is for close ticket logic
    //sort labels
    label_c.sort();
    
    var tmp_c = label_c[0]
    labelClose.push(tmp_c)
    var count_c = 0
    // if label match add 
    for (var i = 0; i < label_c.length; i++) {
      if (label_c[i] !== tmp_c) {
        tmp_c = label_c[i]
        labelClose.push(tmp_c)
        dataClose.push(count_c)
        count_c = 0
      }
      count_c = count_c + 1;
    }
    dataClose.push(count_c)


    // set state according ly
    setPendingLabel(labelOpen)
    setPendingData(dataOpen)

    setClosed({ labels: labelClose, data: dataClose })
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
      marginTop: '10rem',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  }

  return (
    <div className="container" style={style.margin}>
      <div className='row'>
        <div className='col'>
          <div style={style.card}>
            <Donut
              data={pendingData}
              label={pendingLabel}
              color={bgColor}
            />
            <Link to={{pathname: "/maintenance/open"}}>
              <button type='button' className="btn btn-primary" style={style.button}>
                OPEN TICKET
              </button>
            </Link>
          </div>
        </div>
        <div className='col'>
          <div style={style.card}>
            <Donut
              data={closedTicket}
              labels={closedTicketLabel}
              color={bgColor}
            />
            <button type='button' className="btn btn-primary" style={style.button}>
              CLOSED TICKET
            </button>
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
