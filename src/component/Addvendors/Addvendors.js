import { React, useContext, useState } from 'react'
import '../Addvendors/addvendors.css'
import DataContext from '../../DataContext/DataContext'
import AddProduct from '../AddProduct/AddProduct'

function Addvendors() {
    const { navigate } = useContext(DataContext)
    // const [inputFields, setInputFields] = useState([{
    //     fullName: '',
    //     emailAddress: '',
    //     salary: ''
    // }]);

    // const addInputField = () => {
    //     setInputFields([...inputFields, {
    //         fullName: '',
    //         emailAddress: '',
    //         salary: ''
    //     }])

    // }
    // const removeInputFields = (index) => {
    //     const rows = [...inputFields];
    //     rows.splice(index, 1);
    //     setInputFields(rows);
    // }
    // const handleChange = (index, evnt) => {

    //     const { name, value } = evnt.target;
    //     const list = [...inputFields];
    //     list[index][name] = value;
    //     setInputFields(list);

    return (
        <div>




            {/* Form for adding or updating a vendor */}
            <form id="vendorForm">
                <div className="top">
                    <h1>ADD VENDOR</h1>
                    <button className="back_button" onClick={() => navigate('/viewvendors')}>Back</button>

                </div>

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
                <AddProduct />

                <button className="addvendors">Add Vendors</button>

            </form>
        </div >

    )
}


export default Addvendors