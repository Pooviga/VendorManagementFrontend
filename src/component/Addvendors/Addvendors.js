import React from 'react'
import '../Addvendors/addvendors.css'

function Addvendors() {
    return (
        <div>
           



            {/* Form for adding or updating a vendor */}
            <form id="vendorForm">
                <h1>Add Vendor</h1>
                <input type="hidden" id="vendorId"></input>



                <label for="vendorName">Vendor Name:</label>
                <input type="text" id="vendorName" name="vendorName" required></input>



                <label for="active">Active:</label>
                <select id="active" name="active" required>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>



                <label for="contactName">Contact Name:</label>
                <input type="text" id="contactName" name="contactName" required></input>



                <label for="addressLine1">Address-Line 1:</label>
                <input type="text" id="addressLine1" name="addressLine1" required></input>



                <label for="addressLine2">Address-Line 2:</label>
                <input type="text" id="addressLine2" name="addressLine2"></input>



                <label for="city">City:</label>
                <input type="text" id="city" name="city" required></input>



                <label for="state">State:</label>
                <input type="text" id="state" name="state" required></input>



                <label for="pinCode">Pin Code:</label>
                <input type="text" id="pinCode" name="pinCode" required></input>



                <label for="country">Country:</label>
                <input type="text" id="country" name="country" required ></input>



                <label for="vendorType">Vendor Type:</label>
                <input type="text" id="vendorType" name="vendorType" required></input>



                <label for="telephone1">Telephone 1:</label>
                <input type="tel" id="telephone1" name="telephone1" required></input>



                <label for="telephone2">Telephone 2:</label>
                <input type="tel" id="telephone2" name="telephone2"></input>



                <label for="vendorEmail">Vendor Email:</label>
                <input type="email" id="vendorEmail" name="vendorEmail" required></input>



                <label for="vendorWebsite">Vendor Web Site:</label>
                <input type="text" id="vendorWebsite" name="vendorWebsite"></input>



                <label for="productDetails">Product Details:</label>
                <textarea id="productDetails" name="productDetails" rows="4" required></textarea>



                <input type="submit" value="Add Vendor"></input>
            </form>
        </div >

    )
}

export default Addvendors