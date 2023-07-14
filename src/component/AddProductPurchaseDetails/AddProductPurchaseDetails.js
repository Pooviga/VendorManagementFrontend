import { React, useContext, useState } from 'react'
import '../Addvendors/addvendors.css'
import DataContext from '../../DataContext/DataContext'
import AddProduct from '../AddProduct/AddProduct'
import TextField from '@mui/material/TextField';
import Popup from 'reactjs-popup';


function Addvendors() {
    const { navigate, postVendor } = useContext(DataContext);
    const [inputFields, setInputFields] = useState([

        {
            vendorId: '00000000-0000-0000-0000-000000000000',
            ProductName: '',

            ProductDescription: '',

            price: ''

        },

    ]);
    const addInputField = (e) => {

        e.preventDefault()

        setInputFields([

            ...inputFields,

            {
                vendorId: '00000000-0000-0000-0000-000000000000',

                ProductName: '',

                ProductDescription: '',

                price: ''

            },

        ]);

    };

    const removeInputFields = (index) => {

        const rows = [...inputFields];

        rows.splice(index, 1);

        setInputFields(rows);

    };

    const handleChange = (index, evnt) => {

        const { name, value } = evnt.target;

        const list = [...inputFields];

        list[index][name] = value;

        setInputFields(list);

        console.log(...list);

    };

    const [newVendor, setNewVendor] = useState({

        vendorName: '',

        isActive: true,

        vendorType: 0,

        addressLine1: '',

        addressLine2: '',

        city: '',

        state: '',

        postalCode: '',

        country: '',

        telePhone1: '',

        telePhone2: '',

        vendorEmail: '',

        vendorWebsite: '',

        productDetailsRequest: [...inputFields]

    })

    return (
        <div className='wholevendors'>

            {/* Form for adding or updating a vendor */}
            <form id="vendorForm">
                <div className="top">
                    <h1>ADD VENDOR</h1>
                    <button className="back_button" onClick={() => navigate('/viewvendors')}>Back</button>

                </div>
                <div className='formdetails'>
                    <input type="hidden" id="userId"></input>

                    <h1>Billing Address</h1>
                    <div class="sidefields">
                        {/* <label for="vendorName">Vendor Name:</label> */}
                        <input placeholder="Billing Adress" type="text" id="billingAddress" name="billingAddress" required onChange={(e) => { setNewVendor({ ...newVendor, billingAddress: e.target.value }) }}></input>
                        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}

                        {/* <label for="vendorType">Vendor Type:</label> */}
                        <input placeholder="Billing Adress City" type="text" id="billingAddressCity" name="billingAddressCity" required ></input>


                    </div>

                    <div class="sidefields">
                        {/* <label for="addressLine1">Address-Line 1:</label> */}
                        <input placeholder="Billing Address State" type="text" id="billingAddressState" name="billingAddressState" required onChange={(e) => { setNewVendor({ ...newVendor, billingAddressState: e.target.value }) }}></input>

                        {/* <label for="addressLine2">Address-Line 2:</label> */}
                        <input placeholder="Billing Address Country" type="text" id="billingAddressCountry" name="addresbillingAddressCountrysLine2" onChange={(e) => { setNewVendor({ ...newVendor, billingAddressCountry: e.target.value }) }}></input>
                    </div>
                    <div class="sidefields">
                        {/* <label for="city">City:</label> */}
                        <input placeholder="Shipping Address" type="text" id="shippingAddress" name="shippingAddress" required onChange={(e) => { setNewVendor({ ...newVendor, shippingAddress: e.target.value }) }}></input>
                        {/* <label for="state">State:</label> */}
                        <input placeholder="State" type="text" id="shippingAddressCity" name="shippingAddressCity" required onChange={(e) => { setNewVendor({ ...newVendor, shippingAddressCity: e.target.value }) }}></input>
                    </div>
                    <div class="sidefields">
                        {/* <label for="pinCode">Pin Code:</label> */}
                        <input placeholder="Shipping Address State" type="text" id="shippingAddressState" name="shippingAddressState" required onChange={(e) => { setNewVendor({ ...newVendor, shippingAddressState: e.target.value }) }}></input>
                        {/* <label for="country">Country:</label> */}
                        <input placeholder="Shipping Address Country" type="text" id="shippingAddressCountry" name="shippingAddressCountry" required onChange={(e) => { setNewVendor({ ...newVendor, shippingAddressCountry: e.target.value }) }}></input>
                    </div>
                    <div class="sidefields">
                        {/* <label for="telephone1">Telephone 1:</label> */}
                        <input placeholder="Shipping Address Zipcode " type="tel" id="shippingAddressZipcode" name="shippingAddressZipcode" required onChange={(e) => { setNewVendor({ ...newVendor, shippingAddressZipcode: e.target.value }) }}></input>
                        {/* <label for="telephone2">Telephone 2:</label> */}
                        <input placeholder="Terms and Conditions" type="tel" id="termsAndConditions" name="termsAndConditions" onChange={(e) => { setNewVendor({ ...newVendor, termsAndConditions: e.target.value }) }}></input>
                    </div>
                    <div class="sidefields">
                        {/* <label for="vendorEmail">Vendor Email:</label> */}
                        <input placeholder="Description" type="text" id="description" name="description" required onChange={(e) => { setNewVendor({ ...newVendor, description: e.target.value }) }}></input>
                        {/* <label for="vendorWebsite">Vendor Web Site:</label> */}
                        {/* <input placeholder="Website Link" type="text" id="vendorWebsite" name="vendorWebsite" onChange={(e) => { setNewVendor({ ...newVendor, vendorWebsite: e.target.value }) }}></input> */}
                    </div>

                    <div className="row">
                        <div className="row">
                            <div className="sidefield">
                                <label className="pdlabel" for="productDetails">Product Details:</label>

                                <div className="col-sm-12">

                                    <button className="removevendors" onClick={addInputField}>Add Products</button>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-8">
                            {
                                inputFields.map((data, index) => {
                                    const { ProductName, ProductDescription, price } = data;
                                    return (

                                        <div className="row my-3" key={index}>
                                            <div class="sidefield">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <input type="text" onChange={(evnt) => handleChange(index, evnt)} value={ProductName} name="ProductName" className="form-control" placeholder="Product Name" />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <input type="email" onChange={(evnt) => handleChange(index, evnt)} value={ProductDescription} name="ProductDescription" className="form-control" placeholder="Product Description" />
                                                </div>
                                                <div className="col">
                                                    <input type="text" onChange={(evnt) => handleChange(index, evnt)} value={price} name="price" className="form-control" placeholder="Price" />
                                                </div>
                                                <div className="col">
                                                    {(inputFields.length !== 1) ? <button className="removevendors" onClick={removeInputFields}>X</button> : ''}
                                                </div>
                                            </div>


                                        </div>
                                    )
                                })
                            }


                        </div>
                    </div>

                    <button className="addvendors" onClick={(e) => { e.preventDefault(); postVendor(newVendor) }}>Add Purchase Order</button>


                </div>


            </form>
        </div >

    )
}


export default Addvendors