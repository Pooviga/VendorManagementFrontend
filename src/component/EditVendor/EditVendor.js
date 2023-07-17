import { React, useContext, useState } from 'react'
import '../Addvendors/addvendors.css'
import DataContext from '../../DataContext/DataContext'

function EditVendors(){
    return (
        <div className='wholevendors'>

            <form id="vendorForm">
                <div className="top">
                    <h1>Add Vendor</h1>
                </div>
                <div className='formdetails'>
                    <input type="hidden" id="vendorId"></input>


                    <div class="sidefields">
                 
                        <input placeholder="Vendor Name" type="text" id="vendorName" name="vendorName" required onChange={(e) => { setNewVendor({ ...newVendor, vendorName: e.target.value }) }}></input>
                        
                        <input placeholder="Vendor Type" type="text" id="vendorType" name="vendorType" required ></input>


                    </div>

                    <div class="sidefields">
                        
                        <input placeholder="Adress-Line 1" type="text" id="addressLine1" name="addressLine1" required onChange={(e) => { setNewVendor({ ...newVendor, addressLine1: e.target.value }) }}></input>

                        
                        <input placeholder="Adress-Line 2" type="text" id="addressLine2" name="addressLine2" onChange={(e) => { setNewVendor({ ...newVendor, addressLine2: e.target.value }) }}></input>
                    </div>
                    <div class="sidefields">
                        
                        <input placeholder="City" type="text" id="city" name="city" required onChange={(e) => { setNewVendor({ ...newVendor, city: e.target.value }) }}></input>
                      
                        <input placeholder="State" type="text" id="state" name="state" required onChange={(e) => { setNewVendor({ ...newVendor, state: e.target.value }) }}></input>
                    </div>
                    <div class="sidefields">
                     
                        <input placeholder="Postal code" type="text" id="postalCode" name="postalCode" required onChange={(e) => { setNewVendor({ ...newVendor, postalCode: e.target.value }) }}></input>
                    
                        <input placeholder="Country" type="text" id="country" name="country" required onChange={(e) => { setNewVendor({ ...newVendor, country: e.target.value }) }}></input>
                    </div>
                    <div class="sidefields">
                       
                        <input placeholder="Telephone 1" type="tel" id="telePhone1" name="telePhone1" required onChange={(e) => { setNewVendor({ ...newVendor, telePhone1: e.target.value }) }}></input>
                     
                        <input placeholder="Telephone 2" type="tel" id="telePhone2" name="telePhone2" onChange={(e) => { setNewVendor({ ...newVendor, telePhone2: e.target.value }) }}></input>
                    </div>
                    <div class="sidefields">
                      
                        <input placeholder="Email" type="email" id="vendorEmail" name="vendorEmail" required onChange={(e) => { setNewVendor({ ...newVendor, vendorEmail: e.target.value }) }}></input>
                      
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

                    <button className="addvendors" onClick={(e) => { e.preventDefault(); postVendor(newVendor) }}>Add Vendors</button>


                </div>


            </form>
        </div >

    )
}


export default EditVendors
