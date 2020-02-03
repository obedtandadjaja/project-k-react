// TODO(@kenaszogara): closed and open are exactly the same, the only differences is the button, data to show, and function to re-open/close ticket

import React, {useEffect, useState} from 'react'
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
    margin-top: 4em;
    margin-bottom: 2em;
  }
`

function MaintenanceRequestsClosedPage(props) {
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
      if(maintenance.status === 'closed'){
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

  // update status to "closed" then reload table
  async function openTicket(rowData){
    var data = {id: rowData.id, status: "pending"}
    const dispatch = await edit(currentUserID, data)
    var res = dispatch.payload
    if(res != null) {
      alert("successfully open ticket")
      setDel(true)
    }
  }

  return(
    <Style>
      <div className="closeTicketPage">
        <div className='container'>
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
                  icon: 'add_box',
                  tooltip: 'open ticket',
                  onClick: (event, rowData) => (openTicket(rowData)),
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

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsClosedPage)
