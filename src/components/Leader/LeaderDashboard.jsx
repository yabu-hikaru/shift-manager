import React, { useEffect } from 'react'
import Calendar from '../Calendar/Calendar';
import { useNavigate } from "react-router-dom";

const LeaderDashboard = ({ isLdrAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLdrAuth) {
      navigate('/leader/login');
    }
  }, [])
  
  return (
    <>
      dashbord
      <Calendar isLdrAuth={isLdrAuth} />
    </>
  )
}

export default LeaderDashboard