import React from 'react'

import Popup from '../popup/popup'

export const columns = [
    {
      id: 'table',
      columns: [
        {
          Header: 'Ticket ID',
          accessor: 'id',
          id: 'ticket-id'
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
          Cell: () => (<button onClick={console.log("clicked ")}>View</button>)
        },
        {
          Header: 'Edit Ticket',
          id: 'edit',
          accessor: 'edit',
          Cell: () => (<button onClick={console.log("clicked ")}>Edit</button>)
        },
        {
          Header: 'Close Ticket',
          id: 'close',
          accessor: 'close',
          Cell: () => (
            <Popup 
              button='Close'
              header='Notice'
              body='This is the notice'
            />
            )
        },
      ]
    }
  ]

