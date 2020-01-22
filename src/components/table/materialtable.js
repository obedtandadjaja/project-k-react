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

  /* override MTable class*/
  .MTableHeader-header-154 {
    background: beige;
  }
  
  .MuiTableCell-paddingCheckbox {
    padding: 10px;
  }
`

const columns = [
  { field: 'id', title: 'Ticket Id' },
  { field: 'dateOpened', title: 'Date Opened' },
  { field: 'location', title: 'Location(s)' },
  { field: 'category', title: 'Category'},
  { field: 'description', title: 'Description'},
  { field: 'submittedBy', title: 'Submiited By'},
]

function MaterialTableOpen(props) {
  const {data} = props;
  const [state] = React.useState({ data });

  return (
    <Style>
      <MaterialTable
        title="Close Ticket"
        columns={columns}
        data={state.data}
        options={{
          headerStyle:{
            fontSize: '16px'
          }
        }}
        actions={[
          {
            icon: 'edit',
            tooltip: 'edit ticket',
            onClick: () => (window.location.href = "/"),
          },
          {
            icon: 'delete',
            tooltip: 'close ticket',
            onClick: () => (window.location.href = "/"),
          },
        ]}
      />
    </Style>
    
  );
}

export default MaterialTableOpen;