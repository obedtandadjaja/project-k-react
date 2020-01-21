import React from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'

const Styled = styled.div`
  .popup-content{
    max-width: 400px;
    height: 400px;
    border-radius: 5%;
    border: 10px;
    border-color: #0069D9;
  }
  .popupCard {
    width: 100%;
    font-size: 20px:
  }
  .popupCard > .header {
    width: 100%;
    border-bottom: 1px solid gray;
    text-align: center;
    padding: 5px;
  }
  .popupCard > .body {
    width: 100%;
    padding: 10px 5px;
  }

  .popupCard > .close {
    cursor: pointer;
    position: absolute;
    display: block;
    padding: 2px 5px;
    line-height: 20px;
    right: -10px;
    top: -10px;
    font-size: 24px;
    background: #ffffff;
    border-radius: 18px;
    border: 1px solid #cfcece;
  }
`

function PopupClose(props) {
  const { button, header, body } = props;

  return (
    <Styled>
      <Popup
        trigger={<button>{button}</button>}
        modal>
        {
          close => (
            <div className="popupCard">
              <label className='close' onClick={close}>&times;</label>
              <div className='header'>
                <h1>{header}</h1>
              </div>
              <div className='body'>
                <p>{body}</p>
              </div>
            </div>
          )
        }
      </Popup>
    </Styled>
  )
}

export default PopupClose;