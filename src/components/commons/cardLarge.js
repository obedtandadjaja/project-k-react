import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
      font-family: "Open Sans";
      font-weight: bold;
      font-size: 40px;
      color: white;
  }

  .dashCardMenu .body p{
      margin-top: 3em;
      font-family: Montserrat;
      font-size: 30px;
      font-weight: 700;
      color: white;
  }
`

function CardLarge(props){
  const { clickUrl, header, body, color, revertColor } = props;
  const [hover, setHover] = useState(false);

  var hoverStyle;
  var textStyle;

  if (hover) {
    hoverStyle = {
      backgroundColor: revertColor ? revertColor : color
    }
    textStyle = {
      color: revertColor ? color : ""
    }
  } else {
    hoverStyle = {backgroundColor: color}
    textStyle = {}
  }

  return (
    <StyleWrapper>
      <div className='dashCardMenu' style={hoverStyle} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <Link to={{ pathname: clickUrl }} >
          <div className='case'>
            <div className='header'>
              <h1 style={textStyle}>{header}</h1>
            </div>
            <div className='body'>
              <p style={textStyle}>{body}</p>
            </div>
          </div>
        </Link>
      </div>
    </StyleWrapper>
  )

}

export default CardLarge;