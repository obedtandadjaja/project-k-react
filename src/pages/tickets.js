import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { all } from './../api/properties'

import Donut from '../components/charts/donut'

import {closedTicket, closedTicketLabel, openTicket, openTicketLabel, bgColor} from '../components/charts/mockdata'

function Ticket(props) {
  const { currentUserID, all } = props

  useEffect(() => {
    all(currentUserID, { eager: true })
  }, [all, currentUserID])

  const style = {
    card: {
      width: '300px',
      height: '550px',
      margin: '1.5rem',
      textAlign: 'center',
    },
    button: {
      width: '100%',
      height: '70px',
      marginTop: '2rem',
      borderRadius: '40px',
      fontFamily: 'Open Sans',
      fontSize: '20px',
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
            <button type='button' className="btn btn-primary" style={style.button}>
              OPEN TICKET
            </button>
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
  properties: state.property.getIn(['properties']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Ticket)
