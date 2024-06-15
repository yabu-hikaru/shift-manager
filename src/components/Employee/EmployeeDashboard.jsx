import React, { useEffect } from 'react'
import Calendar from '../Calendar/Calendar';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Common/Navbar';

const EmployeeDashboard = ({ isEmpAuth }) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpAuth) {
      navigate('/employee/login');
    }
  }, [])

  return (
    <>
      {/* <Navbar isEmpAuth={isEmpAuth} /> */}
      <Calendar isEmpAuth={isEmpAuth} />
    </>
  )
}

export default EmployeeDashboard