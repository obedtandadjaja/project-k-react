import styled from 'styled-components'
import { DEVICE_SIZE } from './../constants'

/**
 * Form Hierarchy:
 *  blockCard
 *    blockHeader
 *    blockBody
 */
const FormStyledComponent = styled.div`
  align-items: center;
  justify-content: center;

  .blockCard {
    display: block;
    background-color: ${(props) => props.theme.palette.background.paper};
    width: 400px;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-left: ${(props) => props.theme.space*2}px;
  }

  .blockCard:first-child {
    margin-left: 0;
  }

  .blockHeader {
    background-color: ${(props) => props.theme.palette.background.paper};
    border-radius: 10px 10px 0 0;
    padding: 14px 20px;
    transition: opacity .2s ease-out;
    font-weight: 700;
    font-size: 1.8em;
    color: ${(props) => props.theme.palette.text.primary}
  }

  .blockBody {
    min-height: 50px;
    border-radius: 0 0 10px 10px;
    padding: 1em 2em;
  }

  .formFieldWrapper input {
    width: 100%;
  }

  .formFieldWrapper select {
    width: 100%;
  }

  .btnContainer {
    display: flex;
    justify-content: center;
  }

  @media ${DEVICE_SIZE.mobileL} {
    form {
      width: 100%;
    }

    .row {
      margin-bottom: ${(props) => props.theme.space*2}px;
    }

    .blockCard {
      display: block;
      background-color: ${(props) => props.theme.palette.background.paper};
      width: 330px;
      margin: 1em 0;
    }
  }
`

export default FormStyledComponent
