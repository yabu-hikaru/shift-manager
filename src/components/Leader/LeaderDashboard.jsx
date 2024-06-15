import React, { useEffect } from 'react'
import Calendar from '../Calendar/Calendar';
import { useNavigate } from "react-router-dom";
import Navbar from '../Common/Navbar';

const LeaderDashboard = ({ isLdrAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLdrAuth) {
      navigate('/leader/login');
    }
  }, [])
  
  return (
    <>
      {/* <Navbar isLdrAuth={isLdrAuth} /> */}
      <Calendar isLdrAuth={isLdrAuth} />
    </>
  )
}

export default LeaderDashboard