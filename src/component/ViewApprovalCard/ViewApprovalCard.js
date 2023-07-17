import React, { useEffect, useState } from 'react'
import './ViewApprovalCard.css'
import 'font-awesome/css/font-awesome.min.css';
import Popup from 'reactjs-popup'



const ViewApprovalCard = (props) => {
    const status = props.data.purchaseOrderWithUsersName.status;
    console.log(props.data.purchaseOrderWithUsersName)
    if (status === "Pending") {
        return (

            <div className="Card">
                <div className='viewdetails'>
                    <p><b>Purchased Order Id</b> : {props.data.purchaseOrderWithUsersName.id}</p>
                    {/* <button style={{ fontSize: '24px' }} type="button" class="btn btn-primary"> */}
                    <Popup className='popmodal' trigger=
                        {<button onClick={() => { }}>View</button>}
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
                                        <p><b>Purchase Order Id </b> : </p>
                                        <p>{props.data.purchaseOrderWithUsersName.id}</p>
                                        <p><b>Vendor Name</b> : {props.data.vendorForPurchaseOrder.vendorName}</p>
                                        <>
                                            {props.data?.purchaseProducts?.map((products) => (

                                                <div>
                                                    <p><b>Purchased Products :</b>({products.quantity})</p>
                                                    <li><b>Product Name</b> : {products.productName} Rs.{products.price}</li>
                                                    <li><b>Total {products.productName} purchased</b> : {products.quantity}</li>
                                                    <br></br>
                                                </div>
                                            ))}
                                        </>
                                        <p><b>Total Amount</b> : Rs.{props.data.purchaseOrderWithUsersName.total}</p>
                                        <p><b>Ordered On</b> : {props.data.purchaseOrderWithUsersName.orderDateTime}</p>

                                        <p><b>Billing Adress</b> : </p>
                                        <p>{props.data.purchaseOrderWithUsersName.billingAddress}, {props.data.purchaseOrderWithUsersName.billingAddressCity}</p>
                                        <p>{props.data.purchaseOrderWithUsersName.billingAddressState}, {props.data.purchaseOrderWithUsersName.billingAddressCountry} </p>
                                        <p>{props.data.purchaseOrderWithUsersName.billingAddressZipcode}</p>
                                        <p><b>Shipping Adress </b> : </p>
                                        <p>{props.data.purchaseOrderWithUsersName.shippingAddress}, {props.data.purchaseOrderWithUsersName.shippingAddressCity}</p>
                                        <p>{props.data.purchaseOrderWithUsersName.shippingAddressState}, {props.data.purchaseOrderWithUsersName.shippingAddressCountry} </p>
                                        <p>{props.data.purchaseOrderWithUsersName.shippingAddressZipcode}</p>
                                        <p><b>Terms and Conditions </b> : {props.data.purchaseOrderWithUsersName.termsAndConditions}</p>


                                    </div>

                                </div>
                            )
                        }
                    </Popup>
                </div>

                {/* <i class="fa-thin fa-circle-info"></i> */}
                {/* </button> */}
                <p><b>Status</b> : {status}</p>
                <p><b>Ordered Date</b> : {props.data.purchaseOrderWithUsersName.orderDateTime}</p>
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

        )
    }
}

export default ViewApprovalCard