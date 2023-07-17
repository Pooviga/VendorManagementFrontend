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
                    <h1 className='heading'>VENDOR MANAGEMENT SYSTEM</h1>

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
                                    <Link to='/viewusers' ><span>View Users</span></Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/viewvendors'><span>View Vendors</span></Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/purchaseorders' ><span>Purchase Orders</span></Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/viewapproval' ><span>PO Approval</span></Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/viewuserapproval' ><span>User Approval</span></Link>
                                </li>

                            </div> : <></>
                        }


                        {role == 'approver' ?
                            <div>
                                <li className='nav-text'>
                                    <Link to='/dashboard'><span>Dashboard</span></Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/viewvendors'><span>View Vendors</span></Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/purchaseorders' ><span>Purchase Orders</span></Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/viewapproval' ><span>PO Approval</span></Link>
                                </li>

                            </div> : <></>}
                        {role == 'user' ?
                            <div>
                                <li className='nav-text'>
                                    <Link to='/dashboard'><span>Dashboard</span></Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/viewvendors'><span>View Vendors</span></Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/purchaseorders' ><span>Purchase Orders</span></Link>
                                </li>
                            </div> : <></>}
                        {role == 'readonly' ?
                            <div>
                                <li className='nav-text'>
                                    <Link to='/dashboard'><span>Dashboard</span></Link>
                                </li>

                            </div> : <></>}




                    </ul>
                </nav>
            </IconContext.Provider>

        </div>
    );
}

export default Navbar;