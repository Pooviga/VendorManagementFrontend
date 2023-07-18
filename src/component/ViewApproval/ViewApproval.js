import React, { useState, useEffect } from 'react'
import ViewApprovalCard from '../ViewApprovalCard/ViewApprovalCard'
import axios from "axios";
import './ViewApproval.css'
import ViewPurchaseTable from '../ViewPurchaseTable/ViewPurchaseTable';



const ViewApproval = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:7017/PurchaseOrder").then((res) => setData(res.data.filter(e => e.purchaseOrderWithUsersName.status === 'Pending')));
    }, [])
    console.log(data)

    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>PO Id</th>
                        <th>User Id</th>
                        <th>Order Placed By</th>
                        <th>Ordered On</th>
                        <th>Total Amount</th>
                        <th>Vendor Name</th>
                        <th>Action</th>
                    </tr>
                </thead>

                {data.map((d) => {
                    return <ViewPurchaseTable key={d.id} data={d} />
                })}
            </table>
        </div>
    )
}

export default ViewApproval