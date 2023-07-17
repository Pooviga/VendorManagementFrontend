import React, { useContext, useState } from 'react';
import './ViewUserApprovalCard.css';
import 'font-awesome/css/font-awesome.min.css';
import Popup from 'reactjs-popup';
import DataContext from '../../DataContext/DataContext';
import { Navigate, useNavigate } from 'react-router';


const ViewUserApprovalCard = (props) => {
    const status = props.data.approvalStatus;
    const { id } = useContext(DataContext);
    const navigate = useNavigate();

    const handleApprove = () => {

        console.log(id)
        console.log(props.data.id)
        const apiEndpoint = `https://localhost:7017/update/${props.data.id}/${id}/${"Approved"}`;

    fetch(apiEndpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
    })
    .then((response) => {
        // Handle the response from the server if needed
        // navigate("/viewuserapproval")
        console.log(props)
        // props.call;
        console.log('User approved successfully');
        
    })
    .catch((error) => {
        // Handle errors if the request fails
        console.error('Error while approving user:', error);
    });
    axios.get("https://localhost:7017/api/User").then((res) => setData(res.data));
    };

    if (status === 'Pending') {
        return (
            <div className="Card">
                <p><b>Id</b> : {props.data.role.id}</p>
                <p><b>Name</b> : {props.data.name}</p>
                <p><b>Role</b> : {props.data.role.name}</p>
                <p><b>Mail Id</b> : {props.data.email}</p>
                <p><b>Status</b> : {status}</p>
                <p><b>Phone Number</b> : {props.data.phoneNumber}</p>
                <div className="buttons">
                    <button className="btn" onClick={handleApprove}>
                        Approve
                    </button>
                    <button className="btn">Decline</button>
                </div>
            </div>
        );
    } else {
        return null; // Return null if the status is not "Pending"
    }
};

export default ViewUserApprovalCard;



// import React from 'react'
// import './ViewUserApprovalCard.css'
// import 'font-awesome/css/font-awesome.min.css';
// import Popup from 'reactjs-popup'

// const ViewUserApprovalCard = (props) => {
//     const status = props.data.approvalStatus;
//     if (status === "Pending") {

//         return (
//             <div className="Card">
//                 <p><b>Id</b> : {props.data.role.id}</p>
//                 <p><b>Name</b> : {props.data.name}</p>
//                 <p><b>Role</b> : {props.data.role.name}</p>
//                 <p><b>Mail Id</b> : {props.data.email}</p>
//                 <p><b>Status</b> : {status}</p>
//                 <p><b>Phone Number</b> : {props.data.phoneNumber}</p>
//                 <div className="buttons">
//                     <button className="btn">Approve</button>
//                     <button className="btn">Decline</button>
//                 </div>

//             </div>
//         )
//     }
// }

// export default ViewUserApprovalCard