import React from 'react'
import { FaAlignRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import '../Viewvendors/Viewvendors.css'

function Viewvendors() {
    const navigate = useNavigate("/")
    return (
        <div class="viewvendorswholediv">
            <div className="topics">
                <h2 className="rh2">Registered Vendors</h2>
                <button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button>
            </div>
            <div class="table_overflow">
                <table id="vendorTable">
                    <tr>
                        <th>Vendor Name</th>
                        <th>Active</th>
                        <th>Contact Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Pin Code</th>
                        <th>Country</th>
                        <th>Vendor Type</th>
                        <th>Telephone 1</th>
                        <th>Telephone 2</th>
                        <th>Vendor Email</th>
                        <th>Vendor Website</th>
                        <th>Product Details</th>
                        <th>Action</th>
                    </tr>
                </table>
            </div>

        </div>
    )
}

export default Viewvendors