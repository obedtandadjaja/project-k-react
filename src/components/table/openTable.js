import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Popup from '../popup/popup';

// set style
const useStyles = makeStyles({
  table: {
    maxHeight: 500,
  },
  root: {
    width: '100%',
  },

});

// set up header 
const columns = [
  {id: 'id', label: 'Ticket Id', minWidth: 100},
  {id: 'dateOpened', label: 'Date Opened', minWidth: 100},
  {id: 'location', label: 'Location(s)', minWidth: 150},
  {id: 'category', label: 'Category', minWidth: 150},
  {id: 'description', label: 'Description', minWidth: 100},
  {id: 'submittedBy', label: 'Submiited By', minWidth: 100},

  // table popup button column
  {id: 'view', label: 'View Details', minWidth: 100},
  {id: 'edit', label: 'Edit Ticket', minWidth: 100},
  {id: 'close',label: 'Close Ticket',minWidth: 100},
]


function OpenTable(props) {
  const style = useStyles();
  const { data } = props;

  return (
    <Paper className={style.root}>
      <TableContainer className={style.table}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(columns => (
                <TableCell
                  key={columns.id}
                  align={"center"}
                  style={{ minWidth: columns.minWidth }}
                >
                  {columns.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => {
              return(
                <TableRow>
                  <TableCell align={'center'}>{row.id}</TableCell>
                  <TableCell align={'center'}>{row.dateOpened}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.submittedBy}</TableCell>
                  <TableCell><button>View</button></TableCell>
                  <TableCell><button>Edit</button></TableCell>
                  <TableCell>
                    <Popup 
                      button='Close'
                      header='Notice'
                      body='This is the notice'
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    
  );
}

export default OpenTable;