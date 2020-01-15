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