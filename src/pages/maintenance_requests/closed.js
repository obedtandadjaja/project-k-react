import React, { useEffect } from 'react'
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
  const { currentUserID, maintenanceRequests, loading, all, edit } = props;

  useEffect(() => {
    all(currentUserID, { eager: 'Property, Room, Reporter', status: 'closed' })
  }, [currentUserID, all, loading])

  const openTicket = (rowData) => {
    const data = { id: rowData.id, status: 'pending' }
    edit(currentUserID, data)
  }

  return(
    <Style>
      <div className='closeTicketPage'>
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
                      if (window.confirm('Are you sure you want to reopen this ticket?'))
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
  maintenanceRequests: state.maintenance_request.getIn(['maintenanceRequests']),
  loading: state.maintenance_request.getIn(['editLoading'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
  edit,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsClosedPage)
