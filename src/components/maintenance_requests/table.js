import React from 'react'
import { useHistory } from 'react-router-dom'
import MaterialTable from 'material-table'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { edit } from './../../api/maintenanceRequests'
import { MAINTENANCE_REQUEST_CATEGORY_MAP, COLOR_SCHEME } from './../../constants'

const Style = styled.div`
  overflow: auto;
  width: 100%;

  table{
    padding: 20px;
  }
`

function TicketTable(props) {
  const { title, tickets, loading, status, currentUserID, edit } = props
  const history = useHistory()

  const tableData = []

  tickets.map((data) => {
    var dataObj = {
      'id': data.id,
      'createdAt': moment(data.createdAt).format('YYYY MMM Do [, ] ddd'),
      'location': `${data.property.address}, ${data.property.name}, (${data.room.name})`,
      'category': MAINTENANCE_REQUEST_CATEGORY_MAP.get(data.category).name,
      'title': data.title,
      'reporterName': data.reporter.name,
    }
    return tableData.push(dataObj)
  })

  const columns = [
    { field: 'id', title: 'Ticket Id' },
    { field: 'createdAt', title: 'Date Opened' },
    { field: 'location', title: 'Location(s)' },
    { field: 'category', title: 'Category' },
    { field: 'title', title: 'Title' },
    { field: 'reporterName', title: 'Submitted By' },
  ]

  const actionsPending = [
    {
      icon: 'edit',
      tooltip: 'edit ticket',
      onClick: (event, rowData) => (history.push(`/maintenance_requests/${rowData.id}/edit`))
    },
    {
      icon: 'description',
      tooltip: 'view ticket',
      onClick: (event, rowData) => (history.push(`/maintenance_requests/${rowData.id}/details`))
    },
    {
      icon: 'delete',
      tooltip: 'close ticket',
      onClick: (event, rowData) => {
        if (window.confirm('Are you sure you want to close this ticket?'))
          closeTicket(rowData)
      }
    },
  ]

  const actionsClosed = [
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
      icon: 'add_box',
      tooltip: 'open ticket',
      onClick: (event, rowData) => {
        if (window.confirm('Are you sure you want to reopen this ticket?'))
          openTicket(rowData)
      },
    },
  ]

  const closeTicket = (rowData) => {
    const data = { id: rowData.id, status: 'closed' }
    edit(currentUserID, data)
  }

  const openTicket = (rowData) => {
    const data = { id: rowData.id, status: 'pending' }
    edit(currentUserID, data)
  }

  return (
    <Style>
      <MaterialTable
        title={title}
        columns={columns}
        data={tableData}
        isLoading={loading}
        options={{
          headerStyle: {
            backgroundColor: `${COLOR_SCHEME.gray}`,
            color: `${COLOR_SCHEME.white}`,
            fontSize: '1.2rem'
          }
        }}
        actions={status==='pending' ? actionsPending : actionsClosed} />
    </Style>
    
  );
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  edit
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TicketTable)
