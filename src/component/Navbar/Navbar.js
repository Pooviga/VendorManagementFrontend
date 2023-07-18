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
import { useNavigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Popup from 'reactjs-popup'


function Navbar() {
    const { role, setIslogin, islogin } = useContext(DataContext)
    const navigate = useNavigate();

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const navigateProfile = () => {
        navigate('/profile')
    }
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>

                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <h5 className='heading'>VENDOR MANAGEMENT SYSTEM</h5>
                    {/* <button onClick={() => { setIslogin(false); navigate('/') }}>Logout</button> */}
                    {/* <button className='profile_icon' onClick={() => setIsOpen(true)}><i class="fa fa-user" aria-hidden="true"></i></button> */}
                    <div>
                        <Popup trigger=
                            {<button className='profile_icon' onClick={() => { }}><i class="fa fa-user" aria-hidden="true"></i></button>}
                            modal nested>
                            {
                                close => (
                                    <div>
                                        <div>
                                            <button className="close" onClick=
                                                {() => close()}>
                                                X
                                            </button>
                                        </div>
                                        <div>

                                            <Profile />
                                        </div>

                                    </div>
                                )
                            }
                        </Popup>
                    </div>

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

                            </div> : <></>
                        }


                        {role == 'approver' ?
                            <div>
                                <li className='nav-text'>
                                    <Link to='/dashboard'><span>Dashboard</span></Link>
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