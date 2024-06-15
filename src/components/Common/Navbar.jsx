import React from 'react'
import { Link } from 'react-router-dom'
import { SiSimplelogin } from "react-icons/si";
import { GrLogin } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { IoMdCreate } from "react-icons/io";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import "./Navbar.css"

const Navbar = ({ isEmpAuth, isLdrAuth }) =>  {
  return (
    <nav>
      {!isLdrAuth && !isEmpAuth && <Link to="/signup"><FaArrowUpRightFromSquare className='nav-icon' />SignUp</Link>}
      {!isLdrAuth ? (
        <Link to="/leader/login"><SiSimplelogin className='nav-icon' />Login for Leaders</Link>
      ) : (
        <>
          <Link to="/leader/create-employee"><IoMdCreate className='nav-icon' />従業員作成</Link>
          <Link to="/leader/dashboard"><RxDashboard className='nav-icon' />ダッシュボード</Link>
        </>
      )}
      {!isEmpAuth ? (
        <Link to="/employee/login"><GrLogin className='nav-icon' />Login For Employees</Link>
      ) : (
          <Link to="/employee/dashboard"><RxDashboard className='nav-icon' />ダッシュボード</Link>
      )}
    </nav>
  )
}

export default Navbar