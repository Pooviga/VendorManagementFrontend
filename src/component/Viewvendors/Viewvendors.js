import React from 'react'
import { FaAlignRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import '../Viewvendors/Viewvendors.css'
import Addvendors from '../Addvendors/Addvendors'
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup'

function Viewvendors() {
    const navigate = useNavigate("/")
    return (
        <div class="viewvendorswholediv">
            <div className="topics">
                <h2 className="rh2">Registered Vendors</h2>
                {/* <Popup trigger={<button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button>} position="left center">
                    <div><Addvendors /></div>
                </Popup> */}
                <Popup trigger=
                    {<button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button>}
                    modal nested>
                    {
                        close => (
                            <div className='modal'>
                                <div>
                                    <button className="close" onClick=
                                        {() => close()}>
                                        X
                                    </button>
                                </div>
                                <div className='content'>
                                    <Addvendors />
                                </div>

                            </div>
                        )
                    }
                </Popup>
                {/* <button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button> */}
            </div>
            <div class="table_overflow">
                <table id="vendorTable">
                    <tr>
                        <th>Vendor Name</th>
                        <th>Vendor Type</th>
                        <th>Contact</th>
                        <th>Vendor Email</th>
                        <th>Action</th>
                    </tr>
                </table>
            </div>

        </div>
    )
}

export default Viewvendors