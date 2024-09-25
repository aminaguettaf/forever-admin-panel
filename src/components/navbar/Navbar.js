import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import logo from '../../assets/admin_assets/logo.png'

const Navbar = ({setToken}) => {
  return (
    <div className='nav-bar'>
        <div className='container d-flex align-items-center justify-content-between py-2'>
            <Link to='/'><img src={logo} alt=''/></Link>
            <button onClick={()=>setToken('')}>logout</button>
        </div>
    </div>
  )
}

export default Navbar
