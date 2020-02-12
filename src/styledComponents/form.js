import styled from 'styled-components'

/**
 * Form Hierarchy:
 *  blockCard
 *    blockHeader
 *    blockBody
 *  button
 */
export const FormStyledComponent = styled.div`

  display: contents;
  align-items: center;

  .blockCard{
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

  .blockBody{
    min-height: 50px;
    border-radius: 0 0 10px 10px;
    padding: 14px 20px;
  }

  .btn{
    margin-top: 28px;
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

  @media (max-width: 725px){
    display: block;
    .blockCard{
      display: block;
      background: #FFFFFF;
      width: 400px;
      margin-top: 10%;
      margin-left: 0em;
      border-radius: 10px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  }

`
