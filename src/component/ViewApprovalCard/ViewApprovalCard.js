import React, { useEffect, useState } from 'react'
import './ViewApprovalCard.css'
import ReactDOM from "react-dom";


const ViewApprovalCard = (props) => {
    const status = props.data.purchaseOrders.status;
    console.log(props.data?.purchaseProducts)
    if (status === "Pending") {
        return (

            <div className="container">
                <div className="Card">
                    <p><b>Purchased Order Id</b> : {props.data.purchaseOrders.id}</p>
                    <p><b>Status</b> : {status}</p>
                    <p><b>Ordered Date</b> : {props.data.purchaseOrders.orderDateTime}</p>
                    <p><b>Vendor Name</b> : {props.data.vendorForPurchaseOrder.vendorName}</p>
                    <p><b>Purchased Products :</b></p>
                    <>
                        {props.data?.purchaseProducts?.map((products) => (

                            <div>
                                <li><b>Product Name</b> : {products.productName}</li>
                                <li><b>Quantity</b> : {products.quantity}</li>
                                <br></br>
                            </div>
                        ))}
                    </>
                    <div className="buttons">
                        <button className="btn">Approve</button>
                        <button className="btn">Decline</button>
                    </div>



                </div>


            </div>

        )
    }
}

export default ViewApprovalCard