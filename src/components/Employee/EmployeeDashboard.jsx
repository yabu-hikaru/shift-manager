import React, { useEffect } from 'react'
import Calendar from '../Calendar/Calendar';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = ({ isEmpAuth }) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpAuth) {
      navigate('/employee/login');
    }
  }, [])

  return (
    <>
      <div>EmployeeDashboard</div>
      <Calendar isEmpAuth={isEmpAuth} />
    </>
  )
}

export default EmployeeDashboard