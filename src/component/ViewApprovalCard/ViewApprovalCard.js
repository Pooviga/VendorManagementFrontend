import React, { useContext } from 'react';
import './ViewApprovalCard.css';
import 'font-awesome/css/font-awesome.min.css';
import Popup from 'reactjs-popup';
import DataContext, { DataProvider } from "../../DataContext/DataContext";

const ViewApprovalCard = (props) => {
    const status = props.data.purchaseOrderWithUsersName.status;
    console.log(props.data.purchaseOrderWithUsersName);
    const { role, id } = useContext(DataContext);
    if (status === 'Pending') {
        return (
            <div>
                <div >
                    <p><b>Purchased Order Id</b>: {props.data.purchaseOrderWithUsersName.id}</p>
                </div>
                <p><b>Status</b>: {status}</p>
                <p><b>Ordered Date</b>: {props.data.purchaseOrderWithUsersName.orderDateTime}</p>
                <p><b>Vendor Name</b>: {props.data.vendorForPurchaseOrder.vendorName}</p>

                <table className="table">
                    <thead>
                        <tr>
                            <th><b>Product Name</b></th>
                            <th><b>Quantity</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data?.purchaseProducts?.map((products) => (
                            <tr key={products.productId}>
                                <td>{products.productName}</td>
                                <td>{products.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p><b>Total Amount</b>: Rs.{props.data.purchaseOrderWithUsersName.total}</p>
                <p><b>Ordered On</b>: {props.data.purchaseOrderWithUsersName.orderDateTime}</p>

                <div className="address">
                    <div>
                        <p><b>Billing Address</b>:</p>
                        <p>{props.data.purchaseOrderWithUsersName.billingAddress}, {props.data.purchaseOrderWithUsersName.billingAddressCity}</p>
                        <p>{props.data.purchaseOrderWithUsersName.billingAddressState}, {props.data.purchaseOrderWithUsersName.billingAddressCountry}</p>
                        <p>{props.data.purchaseOrderWithUsersName.billingAddressZipcode}</p>
                    </div>
                    <div>
                        <p><b>Shipping Address</b>:</p>
                        <p>{props.data.purchaseOrderWithUsersName.shippingAddress}, {props.data.purchaseOrderWithUsersName.shippingAddressCity}</p>
                        <p>{props.data.purchaseOrderWithUsersName.shippingAddressState}, {props.data.purchaseOrderWithUsersName.shippingAddressCountry}</p>
                        <p>{props.data.purchaseOrderWithUsersName.shippingAddressZipcode}</p>
                    </div>
                </div>

                <p><b>Terms and Conditions</b>: {props.data.purchaseOrderWithUsersName.termsAndConditions}</p>
                {(role === 'admin' || role == 'approver') &&
                    <div className="buttons">
                        <button className="btn">Approve</button>
                        <button className="btn">Decline</button>
                    </div>
                }

            </div>
        );
    } else {
        return null; // If the status is not "Pending," you can return null or some other message
    }
}

export default ViewApprovalCard;
