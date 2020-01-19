import React from 'react'

export const columns = [
    {
      id: 'table',
      columns: [
        {
          Header: 'Ticket ID',
          accessor: 'id'
        },
        {
          Header: 'Date Opened',
          accessor: 'dateOpened'
        },
        {
          Header: 'Location(s)',
          accessor: 'location'
        },
        {
          Header: 'Category',
          accessor: 'category'
        },
        {
          Header: 'Description',
          accessor: 'description'
        },
        {
          Header: 'Submitted By',
          accessor: 'submittedBy'
        },
        {
          Header: 'View Details',
          id: 'detail',
          accessor: 'detail',
          Cell: ({ value }) => (<button onClick={console.log("clicked ", value)}>View</button>)
        },
        {
          Header: 'Edit Ticket',
          id: 'edit',
          accessor: 'edit',
          Cell: ({ value }) => (<button onClick={console.log("clicked ", value)}>Edit</button>)
        },
        {
          Header: 'Close Ticket',
          id: 'close',
          accessor: 'close',
          Cell: ({ value }) => (<button onClick={console.log("clicked ", value)}>Done</button>)
        },
      ]
    }
  ]