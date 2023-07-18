import { React, useContext, useState } from 'react'

import '../Addvendors/addvendors.css'

import DataContext from '../../DataContext/DataContext'





function Addvendors() {

    const { navigate, postVendor } = useContext(DataContext);

    const [inputFields, setInputFields] = useState([




        {

            vendorId: '00000000-0000-0000-0000-000000000000',

            ProductName: '',




            ProductDescription: '',




            price: 0




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




                price: 0




            },




        ]);




    };




    const removeInputFields = (index) => {




        const rows = [...inputFields];




        rows.splice(index + 1, 1);




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




        vendorType: '',




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




        productDetailsRequest: []




    })
    function filter() {
        for (let i = 0; i < inputFields.length; i++) {
            inputFields[i].price = parseInt(inputFields[i].price);
        }
    }




    return (

        <div className='wholevendors'>




            {/* Form for adding or updating a vendor */}

            <form id="vendorForm">

                <div className="top">

                    <h1>Add Vendor</h1>

                </div>

                <div className='formdetails'>

                    <input type="hidden" id="vendorId"></input>





                    <div class="sidefields">

                        {/* <label for="vendorName">Vendor Name:</label> */}

                        <input placeholder="Vendor Name" type="text" id="vendorName" name="vendorName" required onChange={(e) => { setNewVendor({ ...newVendor, vendorName: e.target.value }) }}></input>

                        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}




                        {/* <label for="vendorType">Vendor Type:</label> */}

                        <input placeholder="Vendor Type" type="text" id="vendorType" name="vendorType" required onChange={(e) => { setNewVendor({ ...newVendor, vendorType: e.target.value }) }} ></input>





                    </div>




                    <div class="sidefields">

                        {/* <label for="addressLine1">Address-Line 1:</label> */}

                        <input placeholder="Adress-Line 1" type="text" id="addressLine1" name="addressLine1" required onChange={(e) => { setNewVendor({ ...newVendor, addressLine1: e.target.value }) }}></input>




                        {/* <label for="addressLine2">Address-Line 2:</label> */}

                        <input placeholder="Adress-Line 2" type="text" id="addressLine2" name="addressLine2" onChange={(e) => { setNewVendor({ ...newVendor, addressLine2: e.target.value }) }}></input>

                    </div>

                    <div class="sidefields">

                        {/* <label for="city">City:</label> */}

                        <input placeholder="City" type="text" id="city" name="city" required onChange={(e) => { setNewVendor({ ...newVendor, city: e.target.value }) }}></input>

                        {/* <label for="state">State:</label> */}

                        <input placeholder="State" type="text" id="state" name="state" required onChange={(e) => { setNewVendor({ ...newVendor, state: e.target.value }) }}></input>

                    </div>

                    <div class="sidefields">

                        {/* <label for="pinCode">Pin Code:</label> */}

                        <input placeholder="Postal code" type="text" id="postalCode" name="postalCode" required onChange={(e) => { setNewVendor({ ...newVendor, postalCode: e.target.value }) }}></input>

                        {/* <label for="country">Country:</label> */}

                        <input placeholder="Country" type="text" id="country" name="country" required onChange={(e) => { setNewVendor({ ...newVendor, country: e.target.value }) }}></input>

                    </div>

                    <div class="sidefields">

                        {/* <label for="telephone1">Telephone 1:</label> */}

                        <input placeholder="Telephone 1" type="tel" id="telePhone1" name="telePhone1" required onChange={(e) => { setNewVendor({ ...newVendor, telePhone1: e.target.value }) }}></input>

                        {/* <label for="telephone2">Telephone 2:</label> */}

                        <input placeholder="Telephone 2" type="tel" id="telePhone2" name="telePhone2" onChange={(e) => { setNewVendor({ ...newVendor, telePhone2: e.target.value }) }}></input>

                    </div>

                    <div class="sidefields">

                        {/* <label for="vendorEmail">Vendor Email:</label> */}

                        <input placeholder="Email" type="email" id="vendorEmail" name="vendorEmail" required onChange={(e) => { setNewVendor({ ...newVendor, vendorEmail: e.target.value }) }}></input>

                        {/* <label for="vendorWebsite">Vendor Web Site:</label> */}

                        <input placeholder="Website Link" type="text" id="vendorWebsite" name="vendorWebsite" onChange={(e) => { setNewVendor({ ...newVendor, vendorWebsite: e.target.value }) }}></input>

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

                                                    <input type="text" onChange={(evnt) => handleChange(index, (evnt))} value={price} name="price" className="form-control" placeholder="Price" />

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




                    <button className="addvendors" onClick={(e) => { e.preventDefault(); filter(); newVendor.productDetailsRequest = [...inputFields]; console.log(newVendor); postVendor(newVendor) }}>Add Vendors</button>





                </div>





            </form>

        </div >




    )

}





export default Addvendors