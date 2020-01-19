import React from 'react'

import Table from './../components/table/table'
import {data} from './../components/charts/mockdata'
import {columns} from './../components/table/columns'

function OpenTicket() {
  return(
    <div className="openTicketPage">
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <button className="btn btn-primary">Add Ticket</button>
          </div>
          <div className='col'>
            <div className='searchWrapper'>
              <p>Sort By:</p>
            </div>
          </div>
        </div>
      </div>
      <div className="tableWrapper">
        <Table
          columns={columns}
          data={data}
        />
      </div>
    </div>
  )
}

export default OpenTicket;