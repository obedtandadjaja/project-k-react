// TODO(@kenaszogara): Make the date to show more valuable information

import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MaterialTableOpen from '../../components/table/materialTable'
import { all, edit } from '../../api/maintenances'
import { get as getProperty } from '../../api/properties'
import { get as getRoom } from '../../api/rooms'
import { get as getUser } from '../../api/users'

const Style = styled.div`
  /* custom styling openTicketPage */
  .col{
      padding: 0;
  }
  .row{
    margin-bottom: 2em;
  }
`

function MaintenanceRequestsOpenPage(props) {
  const { currentUserID, all, getProperty, getRoom, getUser, edit } = props;
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
      if(maintenance.status === 'pending'){
        const property = await getProperty(currentUserID, maintenance.propertyID)
        const room = await getRoom(currentUserID, maintenance.propertyID, maintenance.roomID)
        const reporter = await getUser(currentUserID)

        var date = moment(maintenance.createdAt).format("MMM Do [, ] dddd")

        var dataObj = {
          'id': maintenance.id,
          'createdDate': date + ' (' + hour + ')',
          'location': property.payload.name + ', ' + room.payload.name,
          'category': maintenance.title,
          'description': maintenance.description,
          'reporterName': reporter.payload.name,
        }

        setMaintenances(prevState => [...prevState, dataObj]);
      }
    })
  }

  async function closeTicket(rowData){
    var data = {id: rowData.id, status: "closed"}
    const dispatch = await edit(currentUserID, data)
    var res = dispatch.payload
    if(res != null) {
      alert("successfully close ticket")
      setDel(true)
    }
  }

  return(
    <Style>
      <div className="openTicketPage">
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <Link className="btn btn-primary" to={{ pathname: '/maintenance_requests/create' }}>
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
                  onClick: (event, rowData) => (props.history.push(`/maintenance_requests/${rowData.id}/edit`)),
                },
                {
                  icon: 'delete',
                  tooltip: 'close ticket',
                  onClick: (event, rowData) => (closeTicket(rowData)),
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
  edit,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsOpenPage)
