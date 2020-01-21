import React from 'react'
import { useTable, useSortBy } from 'react-table'
import styled from 'styled-components'


// styling for table component
const Styles = styled.div`
  table {
    background: white;
    border-spacing: 0;
    border: 3px solid #5AA5FE;
    text-align: center;

    #ticket-id{
      position: sticky;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 3px solid #5AA5FE;
      border-right: 3px solid #5AA5FE;

      :last-child {
        border-right: 0;
      }
    }
  }
`


function Table({data, columns}) {

  //data should be json object

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  }, useSortBy)

  // Render the UI for your table
  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ' '}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            }
          )}
        </tbody>
      </table>
    </Styles>
  )


}

export default Table;