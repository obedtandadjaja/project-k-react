import React from 'react'
import { Link } from 'react-router-dom'

import Donut from '../components/charts/donut'

import {closedTicket, closedTicketLabel, openTicket, openTicketLabel, bgColor} from '../components/charts/mockdata'

function Maintenance() {

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
              data={openTicket}
              labels={openTicketLabel}
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

export default Maintenance;
