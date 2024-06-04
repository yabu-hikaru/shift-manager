import { addDoc, collection, endBefore } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../db/firebase';
import dayjs from 'dayjs';

const CreateShift = ({ clickedDate }) => {
  const [ date, setDate ] = useState('');
  const [ startTime, setStartTime ] = useState('');
  const [ endTime, setEndTime ] = useState('');

  const handleCreateShifts = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "shifts"), {
        date: `${clickedDate.year()}-${clickedDate.month()}-${clickedDate.date()}`,
        startTime: startTime,
        endTime: endTime
      }
    );
    alert("シフトを作成しました")
    } catch ( error ) {
      console.error("エラーが起きました", error)
    }
  }

  return (
    <form onSubmit={handleCreateShifts} >
      <input 
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <input 
        type="time" 
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <button type='submit'>シフト枠作成</button>
    </form>
  )
}

export default CreateShift;