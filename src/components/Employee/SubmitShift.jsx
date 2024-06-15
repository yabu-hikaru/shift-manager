import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../db/firebase';
import "./SubmitShift.css"

const SubmitShift = ({ clickedDate }) => {
  const [shifts, setShifts ] = useState([]);
  const [ selectedShift, setSelectedShift ] = useState(null);
  const [ employeeName, setEmployeeName ] = useState("");

  useEffect(() => {
    if  (auth.currentUser) {
      const fetchUserName = async () => {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setEmployeeName(userDoc.data().name)
        }
      };
      fetchUserName();
    }
  }, [])

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
        endTime: selectedShift.endTime,
        employeeName: employeeName
      } );
      // TODO 成功処理
      alert('シフトを提出しました。');
    } catch ( error ) {
      console.error('エラーが起きました', error );
    }
  };
  
  return (
    <div className='shift-form'>
      <div className='form-title'>
        <p>シフト提出フォーム</p>
      </div>
      <div className='shift-content'>
        <p><span>{clickedDate.format('MM/DD').replace(/0+(?=[0-9])/g, '')}</span>のシフト</p>
        {shifts.length > 0 ? (
          shifts.map( shift => (
            <div key={shift.id} onClick={() => handleShiftSelect(shift)} className='shift-time'>
              <p>{shift.startTime} - {shift.endTime}</p>
            </div>
          ))
        ) : (
          <div className='shift-text'>この日にシフトはありません</div>
        )}
      </div>

      { selectedShift && (
        <form onSubmit={handleShiftSubmit} className='shift-submit-form'>
          <p>選択したシフト: <span>{selectedShift.startTime} - {selectedShift.endTime}</span> </p>
          <button type='submit'>提出</button>
        </form>
      ) }
    </div>
  )
}

export default SubmitShift