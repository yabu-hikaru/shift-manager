import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../db/firebase';

const SubmitShift = ({ clickedDate }) => {
  const [shifts, setShifts ] = useState([]);
  const [ selectedShift, setSelectedShift ] = useState(null);

  useEffect(() => {
    if (clickedDate) {
      const fetchShifts = async () => {
        const q = query(
          collection(db, "shifts"),
          where("date", "==", clickedDate.format('YYYY-MM-DD'))
        );
        const querySnapshot = await getDocs(q);
        const shiftData = querySnapshot.docs.map( doc => ({ ...doc.data(), id: doc.id }));
        setShifts(shiftData);
      };
      fetchShifts();
    }
  },[clickedDate]);

  const handleShiftSelect = (shift) => {
    setSelectedShift(shift);
  };

  const handleShiftSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;

      await addDoc( collection(db, "assignedShifts"), {
        shiftID: selectedShift.id,
        userID: user.uid,
        date: selectedShift.date,
        startTime: selectedShift.startTime,
        endTime: selectedShift.endTime
      } );
      // TODO 成功処理
      alert('シフトを提出しました。');
    } catch ( error ) {
      console.error('エラーが起きました', error );
    }
  };
  
  return (
    <div>
      <h1>シフト提出</h1>
      <div>
        <h2>{clickedDate.format('MM/DD')}のシフト</h2>
        {shifts.length > 0 ? (
          shifts.map( shift => (
            <div key={shift.id} onClick={() => handleShiftSelect(shift)}>
              <p>{shift.startTime} - {shift.endTime}</p>
            </div>
          ))
        ) : (
          <p>この日にシフトはありません</p>
        )}
      </div>

      { selectedShift && (
        <form onSubmit={handleShiftSubmit}>
          <p>選択したシフト: {selectedShift.startTime} - {selectedShift.endTime} </p>
          <button type='submit'>提出</button>
        </form>
      ) }
    </div>
  )
}

export default SubmitShift