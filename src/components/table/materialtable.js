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
  const { tickets, actions, filter } = props;

  const moment = require('moment')
  const arrTicket = tickets.filter(it => it.status.includes(filter))
  const tableData = []

  arrTicket.map((data) => {
    var dataObj = {
      'id': data.id,
      'createdDate': moment(data.createdAt).format("MMM Do [, ] dddd"),
      'location': data.property.address + ', \n' + data.property.name + ' (' + data.room.name +')',
      'category': MAINTENANCE_REQUEST_CATEGORY_MAP.get(data.title).name,
      'description': data.description,
      'reporterName': data.reporter.name,
    }
    return tableData.push(dataObj)
  })

  const columns = [
    { field: 'id', title: 'Ticket Id' },
    { field: 'createdDate', title: 'Date Opened' },
    { field: 'location', title: 'Location(s)' },
    { field: 'category', title: 'Category' },
    { field: 'description', title: 'Description' },
    { field: 'reporterName', title: 'Submiited By' },
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
        actions={actions}
      />
    </Style>
    
  );
}

export default TicketTable
