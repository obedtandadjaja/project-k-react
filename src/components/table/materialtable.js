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

export default function MaterialTableOpen() {
  const [state, setState] = React.useState({
    columns: [
      { field: 'id', title: 'Ticket Id' },
      { field: 'dateOpened', title: 'Date Opened' },
      { field: 'location', title: 'Location(s)' },
      { field: 'category', title: 'Category'},
      { field: 'description', title: 'Description'},
      { field: 'submittedBy', title: 'Submiited By'},
    ],
    data: [
      {
        'id': 11,
        'dateOpened': '2/1/2019',
        'location': '101 (Property A)',
        'category': null,
        'description': null,
        'submittedBy': null,
      },
      {
        'id': 12,
        'dateOpened': '3/1/2019',
        'location': 'TOWER (Property A)',
        'category': null,
        'description': null,
        'submittedBy': null,
      }
    ],
  });

  return (
    <Style>
      <MaterialTable
        title="Close Ticket"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
        options={{
          headerStyle:{
            fontSize: '16px'
          }
        }}
      />
    </Style>
    
  );
}