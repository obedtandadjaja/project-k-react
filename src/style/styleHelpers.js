import styled from 'styled-components';

export const HoverButton = styled.button`
  :hover{
    color: red;
  }
`

// size: 400x400
export const LoginStyle = styled.div`
  width: 400px;
  height: 400px;

  margin: auto;
  margin-top: 8rem;

  h1{
    margin: 20px auto;
    text-align: center;
  }
  input{
    width: 100%;
  }
  button{
    margin-top:4rem;
    width: 100%;
  }

  .blockCard{
    background-color: white;
    border-radius: 20px;
    height: 100%
    width: 100%;
    margin: 0 auto;
  }
  .blockBody{
    padding: 14px 20px 20px 20px;
  }
`

// size: 200x200
export const CardStyle = styled.div`
  width: 200px;
  height: 10em;
  background-color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover{
    cursor: pointer;
  }

  p{
    margin: 0;
  }
  
`

export const FormStyle = styled.div`

  display: contents;
  align-items: center;
  
  .blockCard{
    display: block;
    background: #FFFFFF;
    width: 400px;
    margin-top: 10%;
    border-radius: 10px;
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

  .button{
    margin-top: 28px;
    width: 165px;
    height: 60px;
    border-radius: 30px;
    background: #18A0FB;
    border: none;
    font-size: 1.5rem;
    color: #FFFFFF;
    /*
    box-shadow: 0 0 8px 0 rgba(203, 162, 44, 0.7), 0 0 8px 0 rgba(203, 162, 44, 0.9);
    */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
    :hover{
      background-color: #f39c12;
    }
  }

`