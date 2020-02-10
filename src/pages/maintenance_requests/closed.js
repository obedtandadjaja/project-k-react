// TODO(@kenaszogara): closed and open are exactly the same, the only differences is the button, data to show, and function to re-open/close ticket

import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TicketTable from './../../components/table/materialTable'
import { all, edit } from './../../api/maintenanceRequests'

const Style = styled.div`
  .col{
      padding: 0;
  }
  .row{
    margin-top: 4em;
    margin-bottom: 2em;
  }
`

function MaintenanceRequestsClosedPage(props) {
  const { currentUserID, maintenanceRequests, all, edit } = props;
  const [del, setDel] = useState(null)

  useEffect(() => {
    all(currentUserID, { eager: 'Property, Room, Reporter' })
  }, [currentUserID, all, del])

  async function openTicket(rowData){
    var data = {id: rowData.id, status: "pending"}
    const dispatch = await edit(currentUserID, data)
    var res = dispatch.payload
    if(res != null) {
      setDel(true)
    }
  }

  return(
    <Style>
      <div className="closeTicketPage">
        <div className='container'>
          <div className='row'>
            {
              maintenanceRequests && 
              <TicketTable
                tickets={maintenanceRequests}
                filter='closed'
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'edit ticket',
                    onClick: (event, rowData) => (props.history.push(`/maintenance_requests/${rowData.id}/edit`)),
                  },
                  {
                    icon: 'description',
                    tooltip: 'view ticket',
                    onClick: (event, rowData) => (props.history.push(`/maintenance_requests/${rowData.id}/details`))
                  },
                  {
                    icon: 'add_box',
                    tooltip: 'open ticket',
                    onClick: (event, rowData) => {
                      if (window.confirm('Are you sure you wish to re-open this item?'))
                        openTicket(rowData)
                    },
                  },
                ]}
              />
            }
          </div>
        </div>
      </div>
    </Style>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
  maintenanceRequests: state.maintenance_request.getIn(['maintenanceRequests'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
  edit,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsClosedPage)
