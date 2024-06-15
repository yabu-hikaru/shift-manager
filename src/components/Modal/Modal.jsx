import SubmitShift from "../Employee/SubmitShift";
import CreateShift from "../Leader/CreateShift";
import "./Modal.css"
import React from 'react'
import SubmittedShiftsIndex from "./SubmittedShiftsIndex";

const Modal = ({ handleCloseClick, clickedDate, isLdrAuth, isEmpAuth }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {/* TODO useContext使う */}
        { isLdrAuth ?  <CreateShift clickedDate={ clickedDate }/> : <SubmitShift clickedDate={clickedDate} />}
        { clickedDate && (
          <SubmittedShiftsIndex date={clickedDate} />
        )}
        <button onClick={handleCloseClick}>閉じる</button>
      </div>
    </div>
  )
}

export default Modal;