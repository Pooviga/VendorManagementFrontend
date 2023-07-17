import React from 'react';
import './ViewUserApprovalCard.css';
import 'font-awesome/css/font-awesome.min.css';
import Popup from 'reactjs-popup';

const ViewUserApprovalCard = (props) => {
    const status = props.data.approvalStatus;

    const handleApprove = () => {
        const apiEndpoint = `https://localhost:7017/api/User/${props.data.id}/4/Approved`;
        // Replace 'approverId' with the actual ID of the user who is approving the request.
        // You need to specify the appropriate approver ID here.

        fetch(apiEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props.data),
        })
            .then((response) => {
                // Handle the response from the server if needed
                alert("approved successfully");
                console.log('User approved successfully');
            })
            .catch((error) => {
                // Handle errors if the request fails
                console.error('Error while approving user:', error);
            });
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