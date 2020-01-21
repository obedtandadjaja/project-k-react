import React from 'react'

import Table from '../components/table/reactTable'
import {data} from './../components/charts/mockdata'
import {columns} from './../components/table/columns'

import styled from 'styled-components'

const Style = styled.div`
  /* custom styling openTicketPage */
  .tableWrapper{
      font-size: 20px;
      font-family: 'Open Sans';
      width: 1340px;
      height: 500px;
      background: white;
      border: 3px solid #5AA5FE
  }

  .container .tableWrapper table{
      width: 100%;
      padding: 2px;
  }

  .tableWrapper table button{
      width: 100px;
      height: 60px;
      background: #5B61DE;
      border: none;
      font-size: 1.5rem;
      text-align: center;
      color: #FFFFFF;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
      cursor: pointer;
  }

  .tableWrapper table th{
      font-weight: 700;
  }

  .searchWrapper{
      display: flex;
      float: right;
  }
  .searchWrapper p{
      margin: 10px 10px 10px 0;
  }

  .searchWrapper input{
      margin: 10px 10px 10px 0;
  }

  .searchWrapper button{
      margin: 10px 0 10px 0;
  }

  .col{
      padding: 0;
  }
`


function OpenTicket() {
  return(
    <Style>
      <div className="openTicketPage">
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <button className="btn btn-primary">Add Ticket</button>
            </div>
            <div className='col'>
              <div className='searchWrapper'>
                <p>Sort By:</p>
                <input type='select'></input>
                <button className='btn btn-primary'>Filter</button>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className="tableWrapper">
              <Table
                columns={columns}
                data={data}
              />
            </div>
          </div>
        </div>
      </div>
    </Style>
  )
}

export default OpenTicket;