import { useState } from 'react'
import './App.css'
import { createCalender } from './utils/calendar'
import Calendar from './components/Calendar/Calendar';

function App() {

  console.log(createCalender());

  return (
    <>
      <Calendar/>
    </>
  )
}

export default App
