import React, {useEffect} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { data } from './../../components/charts/mockdata'
import { all } from './../../api/maintenance'

import MaterialTableOpen from '../../components/table/materialTable'


const Style = styled.div`
  /* custom styling openTicketPage */
  .col{
      padding: 0;
  }
  .row{
    margin-bottom: 2em;
  }
`

function OpenTicketPage(props) {
  const { currentUserID, maintenances, all } = props;

  useEffect(() => {
    all(currentUserID, { eager: 'MaintenanceRequest' })
  }, [all, currentUserID])

  console.log([maintenances]);

  return(
    <Style>
      <div className="openTicketPage">
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <button className="btn btn-primary">Add Ticket</button>
            </div>
          </div>
          <div className='row'>
            <MaterialTableOpen 
              data={maintenances}
            />
          </div>
        </div>
      </div>
    </Style>
  )
}

const mapStateToProps = state => ({
  maintenances: state.property.getIn(['maintenances']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OpenTicketPage)