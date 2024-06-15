import React, { useEffect, useState } from 'react'
import { getSubmittedShifts } from '../../utils/getAllSubmittedShifts';
import "./SubmittedShiftsIndex.css";

const SubmittedShiftsIndex = ({date}) => {
  const [submittedShifts, setSubmittedShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      const shifts = await getSubmittedShifts(date);
      setSubmittedShifts(shifts);
    }

    fetchShifts();
  }, [date])

  const hasSubmission = () => {
    if ( submittedShifts.length > 0) {
      return true;
    }
  }

  

  return (
    <div className="submitted-shifts">
      { hasSubmission() ? 
      (
      <>
        <ul>
          {submittedShifts.map( shift => (
            <li key={shift.id}>
              <p>従業員名：{shift.employeeName}</p>
              <p>開始時間：{shift.startTime}</p>
              <p>終了時間：{shift.endTime}</p>
            </li>
          ))}
        </ul>
        <p>が提出しています。</p>
      </>
    ) : (
      <div>
        <p>提出者はいません。</p>
      </div>
    )
      }
    </div>
  )
}

export default SubmittedShiftsIndex