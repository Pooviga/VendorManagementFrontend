import React, { useContext, useState } from "react";

import * as FaIcons from "react-icons/fa";

import * as AiIcons from "react-icons/ai";

import { Link, Route, Routes } from "react-router-dom";

import { SidebarData } from "./SidebarData";

import "./Navbar.css";

import { IconContext } from "react-icons";

import DataContext from "../../DataContext/DataContext";

import Addvendors from "../Addvendors/Addvendors";

import Viewvendors from "../Viewvendors/Viewvendors";

import { useNavigate } from "react-router-dom";

import Profile from "../Profile/Profile";

import Popup from "reactjs-popup";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip, Tooltip } from "react-tooltip";

function Navbar(props) {
  const role = props.role;

  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const navigateProfile = () => {
    navigate("/profile");
  };

  const [isOpen, setIsOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("User"));
  const username = userData.name;

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div className="Username">
            <Link className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <h4 className="heading">VENDOR MANAGEMENT SYSTEM</h4>
          </div>

          <div className="navbarright">
            <p>Welcome, {username}</p>

            {/* <button onClick={() => { setIslogin(false); navigate('/') }}>Logout</button> */}

            {/* <button className='profile_icon' onClick={() => setIsOpen(true)}><i class="fa fa-user" aria-hidden="true"></i></button> */}

            <div>
              <Profile />
            </div>
          </div>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <div></div>
            <h2 style={{ marginLeft: "15px" }}>
              <span style={{ color: "white", marginRight: "2px" }}>naf</span>
              <span style={{ color: "#00B0F0", margin: "0" }}>vms</span>
            </h2>
            {role == "admin" ? (
              <div>
                <li className="nav-text">
                  <Link to="/dashboard">
                    <span>Dashboard</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link to="/viewusers">
                    <span>View Users</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link to="/viewvendors">
                    <span>View Vendors</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link to="/purchaseorders">
                    <span>Purchase Orders</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link to="/viewapproval">
                    <span>PO Approval</span>
                  </Link>
                </li>
              </div>
            ) : (
              <></>
            )}

            {role == "approver" ? (
              <div>
                <li className="nav-text">
                  <Link to="/dashboard">
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to="/viewvendors">
                    <span>View Vendors</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to="/purchaseorders">
                    <span>Purchase Orders</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link to="/viewapproval">
                    <span>PO Approval</span>
                  </Link>
                </li>
              </div>
            ) : (
              <></>
            )}

            {role == "user" ? (
              <div>
                <li className="nav-text">
                  <Link to="/dashboard">
                    <span>Dashboard</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link to="/viewvendors">
                    <span>View Vendors</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link to="/purchaseorders">
                    <span>Purchase Orders</span>
                  </Link>
                </li>
              </div>
            ) : (
              <></>
            )}

            {role == "readonly" ? (
              <div>
                <li className="nav-text">
                  <Link to="/dashboard">
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to="/viewvendors">
                    <span>View Vendors</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to="/purchaseorders">
                    <span>Purchase Orders</span>
                  </Link>
                </li>
              </div>
            ) : (
              <></>
            )}

            <li
              className="nav-text"
              onClick={() => {
                localStorage.removeItem("User");

                localStorage.removeItem("token");

                navigate("/");

                window.location.reload();
              }}
            >
              <Link to="/">
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
