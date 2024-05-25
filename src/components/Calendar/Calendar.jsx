import React from 'react';
import "./Calendar.css";
import { createCalender } from '../../utils/calendar';

const Calendar = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar-container">
      <div className="calendar-days">
        {days.map((day, index) => (
          <div key={index} className='calendar-day'>
            <h1>{day}</h1>
          </div>
        ))}
      </div>
      <div className="calendar-dates">
        {createCalender().map(({ date, currentMonth, today }, index) => (
          <div key={index} className={today ? "calendar-today" : "calendar-date"}>
            <h1 className={currentMonth ? "calendar-current-month" : "calendar-other-month"}>
              {date.date()}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
