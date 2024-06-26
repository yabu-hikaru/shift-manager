import { useState } from 'react'
import { createCalender } from './utils/calendar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Calendar from './components/Calendar/Calendar';
import LeaderLogin from './components/Leader/LeaderLogin';
import EmployeeLogin from './components/Employee/EmployeeLogin';
import CreateEmployee from './components/Leader/CreateEmployee';
import LeaderDashboard from './components/Leader/LeaderDashboard';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import LeaderSignUp from './components/Leader/LeaderSignUp';
import Navbar from './components/Common/Navbar';
import Home from './components/Common/Home';

function App() {
  //認証のためにleaderにはpropsとしてisLdrAuthを、employeeにはisEmpAuthを渡す。
  const [ isEmpAuth, setIsEmpAuth ] = useState(localStorage.getItem("isEmpAuth"));
  const [ isLdrAuth, setIsLdrAuth ] = useState(localStorage.getItem("isLdrAuth"));

  return (
    <>
      <Router>
        <Navbar isEmpAuth={isEmpAuth} isLdrAuth={isLdrAuth} />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<LeaderSignUp />} />
          <Route path='/leader/create-employee' element={<CreateEmployee isLdrAuth={isLdrAuth} />} />
          <Route path='/employee/login' element={<EmployeeLogin setIsEmpAuth={setIsEmpAuth} />} />
          <Route path='/leader/login' element={<LeaderLogin setIsLdrAuth={setIsLdrAuth} />} />
          <Route path='/leader/dashboard' element={<LeaderDashboard isLdrAuth={isLdrAuth} />} />
          <Route path='/employee/dashboard' element={<EmployeeDashboard isEmpAuth={isEmpAuth} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
