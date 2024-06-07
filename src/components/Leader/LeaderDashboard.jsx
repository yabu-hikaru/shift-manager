import React, { useEffect } from 'react'
import Calendar from '../Calendar/Calendar';

const LeaderDashboard = ({ isLdrAuth }) => {

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