import React from 'react'
import { useHistory } from 'react-router-dom'
import MaterialTable from 'material-table'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { edit } from './../../api/maintenanceRequests'
import { MAINTENANCE_REQUEST_CATEGORY_MAP, COLOR_SCHEME, DEVICE_SIZE } from './../../constants'
import useMediaQuery from './../../customHooks/useMediaQuery'

const Style = styled.div`
  overflow: auto;
  width: 100%;

  table {
    padding: 20px;
  }

  /* Zebra striping */
  .MuiTableBody-root > tr:nth-of-type(odd) { 
    background: #eee; 
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

  // custom hook to watch media query
  const device = useMediaQuery(DEVICE_SIZE.laptop)

  const style = {
    cell: {
      width: device ? 20 : 100,
      height: device ? '100px' : 20,
      fontSize: device ? 12 : 16,
    },
    header: {
      width: device ? 10 : 100,
      fontSize: device ? 14 : 18,
      textAlign: 'center'
    },
    title: device ? 'ID' : 'Ticket ID',
    date: device ? 'Open' : 'Date Opened',
    
  }

  const columns = [
    { field: 'id', title: style.title, cellStyle: style.cell, headerStyle: style.header },
    { field: 'createdAt', title: style.date, cellStyle: style.cell, headerStyle: style.header },
    { field: 'title', title: 'Title', cellStyle: style.cell, headerStyle: style.header },
    { field: 'category', title: 'Category', cellStyle: style.cell, headerStyle: style.header },
    { field: 'location', title: 'Location(s)', cellStyle: style.cell, headerStyle: style.header },
    { field: 'reporterName', title: 'Submitted By', cellStyle: style.cell, headerStyle: style.header },
  ]

  const actions = [
    {
      icon: 'edit',
      tooltip: 'edit ticket',
      onClick: (event, rowData) => (history.push(`/maintenance_requests/${rowData.id}/edit`))
    },
    {
      icon: 'visibility',
      tooltip: 'view ticket',
      onClick: (event, rowData) => (history.push(`/maintenance_requests/${rowData.id}/details`))
    },
    {
      hidden: status === 'closed' ? true : false,
      icon: 'close',
      tooltip: 'close ticket',
      onClick: (event, rowData) => {
        if (window.confirm('Are you sure you want to close this ticket?'))
          closeTicket(rowData)
      }
    },
    {
      hidden: status === 'pending' ? true : false,
      icon: 'add',
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
          },
          actionsColumnIndex: -1,
        }}
        actions={actions} />
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
