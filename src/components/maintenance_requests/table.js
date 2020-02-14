// https://material-table.com/#/docs/features/actions

import React from 'react'
import MaterialTable from 'material-table'
import styled from 'styled-components'

import { MAINTENANCE_REQUEST_CATEGORY_MAP } from './../../constants'

const Style = styled.div`
  overflow: auto;
  width: 100%;

  table{
    padding: 20px;
  }
`

function TicketTable(props) {
  const { tickets, actions } = props;

  const moment = require('moment')
  const tableData = []

  tickets.map((data) => {
    var dataObj = {
      'id': data.id,
      'createdDate': moment(data.createdAt).format('MMM Do [, ] dddd'),
      'location': `${data.property.address}, ${data.property.name}, (${data.room.name})`,
      'category': MAINTENANCE_REQUEST_CATEGORY_MAP.get(data.category).name,
      'title': data.title,
      'reporterName': data.reporter.name,
    }
    return tableData.push(dataObj)
  })

  const columns = [
    { field: 'id', title: 'Ticket Id' },
    { field: 'createdDate', title: 'Date Opened' },
    { field: 'location', title: 'Location(s)' },
    { field: 'category', title: 'Category' },
    { field: 'title', title: 'Title' },
    { field: 'reporterName', title: 'Submitted By' },
  ]

  return (
    <Style>
      <MaterialTable
        title='Close Ticket'
        columns={columns}
        data={tableData}
        options={{
          headerStyle:{
            fontSize: '16px'
          }
        }}
        actions={actions} />
    </Style>
    
  );
}

export default TicketTable
