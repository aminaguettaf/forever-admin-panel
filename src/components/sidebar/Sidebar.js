import React, {useState} from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';

const Sidebar = () => {
  const[activeLink, setActiveLink] = useState('');
  return (
    <div className='side-bar pt-3 ps-5'>
        <ul>
          <li onClick={()=>setActiveLink('add')} className={`mb-3 p-2 ${activeLink === 'add' && 'active'}`}><Link className='d-flex align-items-center gap-2' to='/add-items'><i className="fa-solid fa-plus fa-fw"></i><p>add items</p></Link></li>
          <li onClick={()=>setActiveLink('list')} className={`mb-3 p-2 ${activeLink === 'list' && 'active'}`}><Link className='d-flex align-items-center gap-2' to='/list-items'><i className="fa-solid fa-check fa-fw"></i><p>list items</p></Link></li>
          <li onClick={()=>setActiveLink('orders')} className={`p-2 ${activeLink === 'orders' && 'active'}`}><Link className='d-flex align-items-center gap-2' to='/orders'><i className="fa-solid fa-check fa-fw"></i><p>orders</p></Link></li>
        </ul>
    </div>
  )
}

export default Sidebar
