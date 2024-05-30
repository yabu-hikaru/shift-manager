import "./Modal.css"
import React from 'react'

const Modal = ({ handleCloseClick }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={handleCloseClick}>閉じる</button>
      </div>
    </div>
  )
}

export default Modal;