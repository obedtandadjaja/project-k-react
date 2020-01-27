// https://material-table.com/#/docs/features/actions

import React from 'react';
import MaterialTable from 'material-table';
import styled from 'styled-components';

const Style = styled.div`
  overflow: auto;
  width: 100%;

  table{
    padding: 20px;
  }
`

const columns = [
  { field: 'id', title: 'Ticket Id' },
  { field: 'createdDate', title: 'Date Opened' },
  { field: 'location', title: 'Location(s)' },
  { field: 'category', title: 'Category'},
  { field: 'description', title: 'Description'},
  { field: 'reporterName', title: 'Submiited By'},
]

function MaterialTableOpen(props) {
  const {data, actions} = props;

  return (
    <Style>
      <MaterialTable
        title="Close Ticket"
        columns={columns}
        data={data}
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

export default MaterialTableOpen;