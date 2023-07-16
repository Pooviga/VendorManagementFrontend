import React from 'react'
import './ViewUserApprovalCard.css'
import 'font-awesome/css/font-awesome.min.css';
import Popup from 'reactjs-popup'

const ViewUserApprovalCard = (props) => {
    const status = props.data.approvalStatus;
    if (status === "Pending") {

        return (
            <div className="Card">
                <p><b>Id</b> : {props.data.role.id}</p>
                <p><b>Name</b> : {props.data.name}</p>
                <p><b>Role</b> : {props.data.role.name}</p>
                <p><b>Mail Id</b> : {props.data.email}</p>
                <p><b>Status</b> : {status}</p>
                <p><b>Phone Number</b> : {props.data.phoneNumber}</p>
                <div className="buttons">
                    <button className="btn">Approve</button>
                    <button className="btn">Decline</button>
                </div>

            </div>
        )
    }
}

export default ViewUserApprovalCard