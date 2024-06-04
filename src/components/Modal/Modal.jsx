import CreateShift from "../Leader/CreateShift";
import "./Modal.css"
import React from 'react'

const Modal = ({ handleCloseClick, clickedDate }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {/* TODO useContext使う */}
        <CreateShift clickedDate={ clickedDate }/>
        <button onClick={handleCloseClick}>閉じる</button>
      </div>
    </div>
  )
}

export default Modal;