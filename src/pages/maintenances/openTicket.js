import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { all, remove } from '../../api/maintenance'
import { get as getProperty } from '../../api/properties'
import { get as getRoom } from '../../api/rooms'
import { get as getUser } from '../../api/users'

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
  const { currentUserID, all, getProperty, getRoom, getUser, remove } = props;
  const [maintenances, setMaintenances] = useState([]);
  const [del, setDel] = useState(null)

  useEffect(() => {
    if(del == null){
      setMaintenances([])
      fetchOpenTicket()
    }
    setDel(null)
  }, [currentUserID, all, del])

  async function fetchOpenTicket() {
    const dispatch = await all(currentUserID)
    mapDispatchToData(dispatch.payload)
  }

  function mapDispatchToData(value) {
    var moment = require('moment')

    value.map( async maintenance => {
      // fetch property room and reporter name
      const property = await getProperty(currentUserID, maintenance.propertyID)
      const room = await getRoom(currentUserID, maintenance.propertyID, maintenance.roomID)
      const reporter = await getUser(currentUserID)

      // format the date with momentjs  
      // further date details can be put here
      // still need to fix hours ago ... .fromNow()
      var hour = moment(maintenance.createdAt, 'h').fromNow()
      var date = moment(maintenance.createdAt).format("MMM Do [, ] dddd")

      // push to maintenances
      var dataObj = {
        'id': maintenance.id,
        'createdDate': date + ' (' + hour + ')',
        'location': property.payload.name + ', ' + room.payload.name,
        'category': maintenance.title,
        'description': maintenance.description,
        'reporterName': reporter.payload.name,
      }

      setMaintenances(prevState => [...prevState, dataObj]);
    })
  }

  async function deleteRow(rowData){
    const dispatch = await remove(currentUserID, rowData.id)
    var res = dispatch.payload
    if(res != null) {
      alert("successfully delete user")
      setDel(true)
    }
  }

  return(
    <Style>
      <div className="openTicketPage">
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <Link className="btn btn-primary" to={{ pathname: '/maintenance/open/create' }}>
                Add Ticket
              </Link>
            </div>
          </div>
          <div className='row'>
            <MaterialTableOpen 
              data={maintenances}
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'edit ticket',
                  onClick: (event, rowData) => (props.history.push(`/maintenance/open/${rowData.id}/edit`)),
                },
                {
                  icon: 'delete',
                  tooltip: 'close ticket',
                  onClick: (event, rowData) => (deleteRow(rowData)),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Style>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
  maintenances: state.maintenance.getIn(['maintenances'])
})

const mapDispatchToProps = dispatch => bindActionCreators({
  all,
  getProperty,
  getRoom,
  getUser,
  remove,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OpenTicketPage)