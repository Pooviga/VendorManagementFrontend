import React, { useContext, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import DataContext from '../../DataContext/DataContext';
import Addvendors from '../Addvendors/Addvendors';
import Viewvendors from '../Viewvendors/Viewvendors';

function Navbar() {
    const { role } = useContext(DataContext)

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>

                        {role == 'admin' ?
                            <div>
                                <li className='nav-text'>
                                    <Link to='/dashboard'><span>Dashboard</span></Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/viewvendors'><span>View Vendors</span></Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/addvendor' ><span>Add Vendor</span></Link>
                                </li>
                            </div> : <></>}


                        {role == 'approver' ?
                            <li className='nav-text'>
                                <Link to='/'><span>{role}</span></Link>
                            </li> : <></>}


                        {role == 'user' ?
                            <li className='nav-text'>
                                <Link to='/'><span>{role}</span></Link>
                            </li> : <></>}


                        {role == 'guest' ?
                            <li className='nav-text'>
                                <Link to='/'><span>{role}</span></Link>
                            </li> : <></>}

                    </ul>
                </nav>
            </IconContext.Provider>
            <div>
                <Routes>

                </Routes>
            </div>
        </div>
    );
}

export default Navbar;