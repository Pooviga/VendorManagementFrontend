import React from 'react'
import { FaAlignRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import '../Viewvendors/Viewvendors.css'
import AddProductPurchaseDetails from '../AddProductPurchaseDetails/AddProductPurchaseDetails'
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup'
import { useEffect, useState } from "react"


function ViewPurchaseOrder() {
    const navigate = useNavigate("/")
    return (
        <div>
            <div className="topics">
                <h2 className="rh2">Purchased Product Details</h2>
                <Popup trigger=
                    {<button className="add_button" onClick={() => { navigate('/addvendor') }}>Create Purchase Order</button>}
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
                                <div className='productform'>
                                    <AddProductPurchaseDetails />
                                </div>

                            </div>
                        )
                    }
                </Popup>
                {/* <button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button> */}
            </div>
            {/* <div class="table_overflow">
                <table id="vendorTable">
                    <tr>
                        <th>Vendor Name</th>
                        <th>Vendor Type</th>
                        <th>Contact</th>
                        <th>Vendor Email</th>
                        <th>Action</th>
                    </tr>
                </table>
            </div> */}

        </div>
    )
}

export default ViewPurchaseOrder