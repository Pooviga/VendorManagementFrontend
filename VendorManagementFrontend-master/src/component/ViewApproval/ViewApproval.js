import React, { useState, useEffect } from 'react'
import ViewApprovalCard from '../ViewApprovalCard/ViewApprovalCard'
import axios from "axios";
import './ViewApproval.css'



const ViewApproval = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:7017/PurchaseOrder").then((res) => setData(res.data));
    }, [])

    return (
        <div className="container">
            {data.map((d) => {
                return <ViewApprovalCard key={d.id} data={d} />
            })}
        </div>
    )
}

export default ViewApproval