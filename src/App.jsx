import { useState } from 'react'
import './App.css'
import { createCalender } from './utils/calendar'
import Calendar from './components/Calendar/Calendar';
import LeaderLogin from './components/Leader/LeaderLogin';
import EmployeeLogin from './components/Employee/EmployeeLogin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEmployee from './components/Leader/CreateEmployee';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Calendar />}/>
          <Route path='/signup' element={<LeaderLogin />} />
          <Route path='/create-employee' element={<CreateEmployee />} />
          <Route path='/employee-login' element={<EmployeeLogin />} />
          <Route path='/leader-login' element={<LeaderLogin />} />
          {/* <Route path='/dashboard'/> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
