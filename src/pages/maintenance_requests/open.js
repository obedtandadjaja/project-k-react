import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TicketTable from './../../components/table/materialTable'
import { all, edit } from './../../api/maintenanceRequests'

const Style = styled.div`
  .col{
      padding: 0;
  }
  .row:first-child{
    margin-top: 2em;
  }
`

function MaintenanceRequestsOpenPage(props) {
  const { currentUserID, maintenanceRequests, all, edit } = props;
  const [del, setDel] = useState(null)

  useEffect(() => {
    all(currentUserID, { eager: 'Property, Room, Reporter' })
  }, [currentUserID, all, del])

  async function closeTicket(rowData){
    var data = {id: rowData.id, status: "closed"}
    const dispatch = await edit(currentUserID, data)
    var res = dispatch.payload
    if(res != null) {
      setDel(true)
    }
  }

  return(
    <Style>
      <div className='openTicketPage'>
        <div className='container'>
          <div className='row'>
            <div className='mr-auto'>
              <Link className='btn btn-primary' to={{ pathname: '/maintenance_requests/create' }}>
                Add Ticket
              </Link>
            </div>
          </div>
          <div className='row'>
            {
              maintenanceRequests &&
              <TicketTable
                tickets={maintenanceRequests}
                filter='pending'
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'edit ticket',
                    onClick: (event, rowData) => (props.history.push(`/maintenance_requests/${rowData.id}/edit`))
                  },
                  {
                    icon: 'description',
                    tooltip: 'view ticket',
                    onClick: (event, rowData) => (props.history.push(`/maintenance_requests/${rowData.id}/details`))
                  },
                  {
                    icon: 'delete',
                    tooltip: 'close ticket',
                    onClick: (event, rowData) => {
                      if (window.confirm('Are you sure you wish to close this item?'))
                        closeTicket(rowData)
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsOpenPage)
