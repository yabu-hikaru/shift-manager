import React, { useEffect, useState } from 'react';
import "./Calendar.css";
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import dayjs from "dayjs";
import { createCalender } from '../../utils/calendar';
import { getAllShifts } from '../../utils/getAllShifts';
import { getAllSubmittedShifts } from '../../utils/getAllSubmittedShifts';
import Modal from '../Modal/Modal';
import ModalPortal from '../Modal/ModalPortal';

const Calendar = ({ isLdrAuth, isEmpAuth }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [ clickedDate, setClickedDate ] = useState("");
  const [ shiftDates, setShiftDates ] = useState([]);
  const [ submittedShifts, setSubmittedShifts ] = useState([]);
  const [ year, setYear ] = useState(dayjs().year());
  const [ month, setMonth ] = useState(dayjs().month());
  const [ modalOpen, setModalOpen ] = useState(false);

  useEffect(() => {
    const fetchShiftDates = async () => {
      //シフト枠の全取得
      const dates = await getAllShifts();
      //提出されたシフト枠の全取得
      const submissions = await getAllSubmittedShifts();

      setShiftDates(dates);
      setSubmittedShifts(submissions);
    }
    fetchShiftDates();
  }, [])

  const prevMonth = () => {
    setMonth(month - 1);
  }

  const nextMonth = () => {
    setMonth(month + 1);
  }

  const handleDateClick = (date) => {
    setClickedDate(date);
    setModalOpen(true);
  }

  return (
    <div className='calendar-start'>
      <div className="calendar-container">
        {/* 月表示 */}
        <div className='current-month'>
          <p>{month + 1}<span>月</span></p>
        </div>
        {/* 曜日表示 */}
        <div className="calendar-days">
          {days.map((day, index) => (
            <div key={index} className='calendar-day'>
              <h1>{day}</h1>
            </div>
          ))}
        </div>
        {/* 日付表示 */}
        <div className="calendar-dates">
          {createCalender(month, year).map(({ date, currentMonth, today }, index) => {
            const isShiftDate = shiftDates.includes(date.format('YYYY-MM-DD'));
            const hasSubmittedShifts = submittedShifts.some(shift => shift.date === date.format('YYYY-MM-DD'));
            return (
              <div 
              key={index} 
              className={`calendar-date ${today ? 'calendar-today' : ''} ${isShiftDate ? 'shift-date' : ''}`}
              onClick={ () => handleDateClick(date) }
              >
              <h1 className={currentMonth ? "calendar-current-month" : "calendar-other-month"}>
                {date.date()}
                {isLdrAuth ? (
                  !hasSubmittedShifts && <FaExclamationCircle className='icon-exclamation' />
                ) : (
                  hasSubmittedShifts && <FaCheckCircle className='icon-check' />
                )}
              </h1>
            </div>
            )
          })}
        </div>
        {/* 翌月、前月移動ボタン */}
        <div className='move-btns'>
          <div className='prev btn'>
            <button onClick={prevMonth}>前月</button>
          </div>
          <div className='next btn'>
            <button onClick={nextMonth}>翌月</button>
          </div>
        </div>
      </div>
      {/* シフト入力のためのフォームをモーダルウィンドウで表示 */}
      {modalOpen && 
      (
        <ModalPortal>
          {/* TODO useContext使う */}
          <Modal 
            clickedDate={clickedDate}
            handleCloseClick={() => setModalOpen(false)} 
            isEmpAuth={isEmpAuth}
            isLdrAuth={isLdrAuth}
          />
        </ModalPortal>
      )}
    </div>
  );
}

export default Calendar;
