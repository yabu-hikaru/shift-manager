import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../db/firebase';
import "../Common/Form.css";

const CreateShift = ({ clickedDate }) => {
  const [ startTime, setStartTime ] = useState('');
  const [ endTime, setEndTime ] = useState('');

  const handleCreateShifts = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "shifts"), {
        date: clickedDate.format("YYYY-MM-DD"),
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
      <form onSubmit={handleCreateShifts}>
        <input 
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className='form-input'
          placeholder='開始時間'
        />
        <input 
          type="time" 
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className='form-input'
          placeholder='終了時間'
        />
        <button type='submit' className='form-button'>シフト枠作成</button>
      </form>
  )
}

export default CreateShift;