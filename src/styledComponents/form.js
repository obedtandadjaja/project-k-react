import styled from 'styled-components'
import { DEVICE_SIZE } from './../constants'

/**
 * Form Hierarchy:
 *  blockCard
 *    blockHeader
 *    blockBody
 *  button
 */
export const FormStyledComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    margin: auto;
  }

  .blockCard {
    display: block;
    background: #FFFFFF;
    width: 400px;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .blockHeader {
    background-color: #f6f7f9;
    border-radius: 10px 10px 0 0;
    padding: 14px 20px;
    transition: opacity .2s ease-out;
    font-weight: 700;
    font-size: 1.8em;
  }

  .formFieldWrapper input {
    width: 100%;
  }

  .formFieldWrapper select {
    width: 100%;
  }

  .blockBody {
    min-height: 50px;
    border-radius: 0 0 10px 10px;
    padding: 14px 20px;
  }

  .btnContainer {
    display: flex;
    justify-content: center;
  }

  .btnContainer button {
    margin: 1em;
  }

  .btn {
    margin-top: 28px;
    margin-bottom: 2em;
    width: 200px;
    height: 60px;
    border-radius: 30px;
    background: #18A0FB;
    border: none;
    font-size: 1.5rem;
    color: #FFFFFF;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
    :hover{
      background-color: #f39c12;
    }
  }

  @media ${DEVICE_SIZE.mobileL} {
    form {
      width: 100%;
    }

    .row {
      margin: 0;
    }

    .blockCard {
      display: block;
      background: #FFFFFF;
      width: 300px;
      margin: 2em;
      border-style: solid;
      border-width: thin;
      border-radius: 5px;
      box-shadow: none;
    }

    .btn {
      margin-top: 0;
      width: 200px;
      height: 50px;
      border-radius: 50px;
      background: #18A0FB;
      font-size: 1.3rem;
      color: #FFFFFF;
      box-shadow: none;
      cursor: pointer;
      :hover{
        background-color: #f39c12;
      }
    }
  }

`
