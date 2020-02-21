import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { DEVICE_SIZE } from './../../constants'

const StyleWrapper = styled.div`
  .dashCardMenu{
    margin: 50px;
    width: 400px;
    height: 500px;
    border-radius: 3%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .dashCardMenu .case{
    padding: 3em;
    height: 100%;
  }

  .dashCardMenu .header h1{
    margin-top: 40%;
    font-weight: bold;
    font-size: 40px;
    color: black;
  }

  .dashCardMenu .body p{
    margin-top: 3em;
    font-size: 30px;
    font-weight: 700;
    color: black;
  }

   @media ${DEVICE_SIZE.mobileL} {
    .dashCardMenu{
      margin: 1.5em;
      width: 280px;
      height: 200px;
    }
    .dashCardMenu .case{
      padding: 2em;
      height: 100%;
    }
    .dashCardMenu .header h1{
      margin-top: 0;
      font-size: 2em;
      color: black;
    }
    .dashCardMenu .body p{
      margin-top: 2em;
      font-size: 1.2em;
      color: black;
    }
  }
`

function CardLarge(props){
  const { clickUrl, header, body, color } = props

  return (
    <StyleWrapper>
      <div className='dashCardMenu' style={{ backgroundColor: color }}>
        <Link to={{ pathname: clickUrl }} >
          <div className='case'>
            <div className='header'>
              <h1>{header}</h1>
            </div>
            <div className='body'>
              <p>{body}</p>
            </div>
          </div>
        </Link>
      </div>
    </StyleWrapper>
  )

}

export default CardLarge;
