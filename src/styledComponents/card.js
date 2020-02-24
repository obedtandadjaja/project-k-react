import styled from 'styled-components'
import { DEVICE_SIZE } from './../constants'

export const CardStyledComponent = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
  }

  p {
    margin: 0;
  }

  @media ${DEVICE_SIZE.mobileL} {
    width: 280px;
    height: 150px;
    border-style: solid;
    border-width: thin;
  }
`
