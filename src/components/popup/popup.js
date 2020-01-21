import React from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'

const Styled = styled.div`
  .popup-content{
    max-width: 400px;
    min-height: 200px;
    border-radius: 10px;
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

  .popupCard .body p{ 
    text-align: center;
  }

  .popupCard .body .btn-wrapper{
    margin: auto;
    text-align: center;
  }

  .popupCard .body .btn-wrapper {
    margin-top: 60px;
  }

  .popupCard .body .btn-wrapper .btn-cancel{
    background: #FE5A5A;
  }

  .popupCard .body .btn-wrapper button{
    margin: 10px;
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
                <h3>{header}</h3>
              </div>
              <div className='body'>
                <p>{body}</p>
                <div className='btn-wrapper'>
                  <button className='btn-confirm'>Confirm</button>
                  <button className='btn-cancel' onClick={close}>Cancel</button>
                </div>
              </div>
            </div>
          )
        }
      </Popup>
    </Styled>
  )
}

export default PopupClose;