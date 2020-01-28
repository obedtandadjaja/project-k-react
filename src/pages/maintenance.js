import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { all } from '../api/maintenance'

import Donut from '../components/charts/donut'

import {bgColor} from '../components/charts/mockdata'

function MaintenancePage(props) {
  const { all, currentUserID, } = props;
  const [pending, setPending] = useState( );
  const [closed, setClosed] = useState([]);

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
    var countOpen = 0
    
    //close
    var label_c = []
    var labelClose = []
    var dataClose = []
    var countClose = 0

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
    setPending({ labels: labelOpen, data: dataOpen, count: label_o.length })
    setClosed({ labels: labelClose, data: dataClose, count: label_c.length })
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
            {pending &&
              <Donut
                datasets={pending}
                color={bgColor}
              />
            }
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
                datasets={{labels: [], data: [], count: 0}}
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
  maintenances: state.maintenance.getIn(['maintenances'])
})

const mapDispatchToProps = dispatch => bindActionCreators({
  all,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(MaintenancePage);
