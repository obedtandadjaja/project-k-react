// https://material-table.com/#/

import React from 'react'
import MaterialTable from 'material-table'
import styled from 'styled-components'
import moment from 'moment'

import { MAINTENANCE_REQUEST_CATEGORY_MAP, COLOR_SCHEME } from './../../constants'

const Style = styled.div`
  overflow: auto;
  width: 100%;

  table{
    padding: 20px;
  }
`

function TicketTable(props) {
  const { title, tickets, loading, actions } = props

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
        actions={actions} />
    </Style>
    
  );
}

export default TicketTable
