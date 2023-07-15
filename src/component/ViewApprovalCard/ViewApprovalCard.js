import React, { useEffect, useState } from 'react'
import './ViewApprovalCard.css'
import 'font-awesome/css/font-awesome.min.css';
import Popup from 'reactjs-popup'



const ViewApprovalCard = (props) => {
    const status = props.data.purchaseOrders.status;
    console.log(props.data?.purchaseProducts)
    if (status === "Pending") {
        return (

            <div className="Card">
                <div className='viewdetails'>
                    <p><b>Purchased Order Id</b> : {props.data.purchaseOrders.id}</p>
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
                                        <p>{props.data.purchaseOrders.id}</p>
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
                                        <p><b>Total Amount</b> : Rs.{props.data.purchaseOrders.total}</p>
                                        <p><b>Ordered On</b> : {props.data.purchaseOrders.orderDateTime}</p>

                                        <p><b>Billing Adress</b> : </p>
                                        <p>{props.data.purchaseOrders.billingAddress}, {props.data.purchaseOrders.billingAddressCity}</p>
                                        <p>{props.data.purchaseOrders.billingAddressState}, {props.data.purchaseOrders.billingAddressCountry} </p>
                                        <p>{props.data.purchaseOrders.billingAddressZipcode}</p>
                                        <p><b>Shipping Adress </b> : </p>
                                        <p>{props.data.purchaseOrders.shippingAddress}, {props.data.purchaseOrders.shippingAddressCity}</p>
                                        <p>{props.data.purchaseOrders.shippingAddressState}, {props.data.purchaseOrders.shippingAddressCountry} </p>
                                        <p>{props.data.purchaseOrders.shippingAddressZipcode}</p>
                                        <p><b>Terms and Conditions </b> : {props.data.purchaseOrders.termsAndConditions}</p>


                                    </div>

                                </div>
                            )
                        }
                    </Popup>
                </div>

                {/* <i class="fa-thin fa-circle-info"></i> */}
                {/* </button> */}
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

        )
    }
}

export default ViewApprovalCard