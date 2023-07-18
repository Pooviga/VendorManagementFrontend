import React, { useContext, useState } from 'react';
import ViewApprovalCard from '../ViewApprovalCard/ViewApprovalCard';
import Popup from 'reactjs-popup';
import './ViewPurchaseTable.css';
import DataContext from '../../DataContext/DataContext';
import { Navigate, useNavigate } from 'react-router-dom';


const ViewPurchaseTable = (props) => {
    const { allData, setAllData } = useContext(DataContext)
    console.log(props.data)
    const status = props.data.purchaseOrderWithUsersName.status;
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useContext(DataContext);
    const navigate = useNavigate();

    const handleApprove = (poId) => {

        console.log(id)
        // console.log(props.data.id)
        const apiEndpoint = `https://localhost:7017/status/${poId}/${id}/${"Approved"}`;
        fetch(apiEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
            .then((response) => {
                console.log("props", props)
                console.log(response)

                // data.filter((nd)=>{
                //     nd
                // })
                // props.setData((prevData) => { return prevData.filter(x => x.purchaseOrderWithUsersName.Id !== poId) })
                setAllData(allData.filter(x => x.purchaseOrderWithUsersName.id !== poId))
                

                console.log('User approved successfully', allData);
                // console.log(data)
            })
            .catch((error) => {
                console.error('Error while approving user:', error);
            });

        // axios.get("https://localhost:7017/api/User").then((res) => setData(res.data));


    }
    const handleDecline = (poId) => {

        console.log(id)
        // console.log(props.data.id)
        const apiEndpoint = `https://localhost:7017/status/${poId}/${id}/${"Declined"}`;
        fetch(apiEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
            .then((response) => {
                console.log("props", props)
                console.log(response)

                // data.filter((nd)=>{
                //     nd
                // })
                // props.setData((prevData) => { return prevData.filter(x => x.purchaseOrderWithUsersName.Id !== poId) })
                setAllData(allData.filter(x => x.purchaseOrderWithUsersName.id !== poId))


                console.log('User approved successfully', allData);
                // console.log(data)
            })
            .catch((error) => {
                console.error('Error while approving user:', error);
            });

        // axios.get("https://localhost:7017/api/User").then((res) => setData(res.data));


    }
    console.log(props.data);
    const data = props.data;
    if (status === "Pending") {
        return (
            <tr>
                <td>{data.purchaseOrderWithUsersName.id}</td>
                <td>{data.purchaseOrderWithUsersName.createdBy.id}</td>
                <td>{data.purchaseOrderWithUsersName.createdBy.name}</td>
                <td>{data.purchaseOrderWithUsersName.orderDateTime}</td>
                <td>{data.purchaseOrderWithUsersName.total}</td>
                <td>{data.vendorForPurchaseOrder.vendorName}</td>
                <td>
                    {/* <button type="button" class="btn-btn" onClick={() => setIsOpen(true)}>
                        <i class="far fa-eye"></i>
                    </button> */}

                    <Popup className='popmodal' trigger=

                        {<button type="button" class="btn-btn" onClick={() => { }}>
                            <i class="far fa-eye"></i>
                        </button>}

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

                                        <div className="Cards">
                                            <div className='viewdetails'>
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
                                            <div className="buttons">
                                                <button className="btn" onClick={() => handleApprove(props.data.purchaseOrderWithUsersName.id)}>Approve</button>
                                                <button className="btn" onClick={() => handleDecline(props.data.purchaseOrderWithUsersName.id)}>Decline</button>
                                            </div>
                                        </div>





                                    </div>




                                </div>

                            )

                        }

                    </Popup>

                </td>
            </tr>
        )
    }
}
export default ViewPurchaseTable;
