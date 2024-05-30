import React, { useState } from 'react';
import "./Calendar.css";
import dayjs from "dayjs";
import { createCalender } from '../../utils/calendar';
import Modal from '../Modal/Modal';
import ModalPortal from '../Modal/ModalPortal';

const Calendar = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [month, setMonth ] = useState(dayjs().month())
  const [year, setYear ] = useState(dayjs().year())
  const [ modalOpen, setModalOpen ] = useState(false)

  const prevMonth = () => {
    setMonth(month - 1);
  }

  const nextMonth = () => {
    setMonth(month + 1);
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
          {createCalender(month, year).map(({ date, currentMonth, today }, index) => (
            <div 
              key={index} 
              className={today ? "calendar-today" : "calendar-date"}
              onClick={ () => setModalOpen(true) }
            >
              <h1 className={currentMonth ? "calendar-current-month" : "calendar-other-month"}>
                {date.date()}
              </h1>
            </div>
          ))}
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
          <Modal handleCloseClick={() => setModalOpen(false)} />
        </ModalPortal>
      )}
    </div>
  );
}

export default Calendar;
