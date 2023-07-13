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


                <div class="sidefields">
                    {/* <label for="vendorName">Vendor Name:</label> */}
                    <input placeholder="Vendor Name" type="text" id="vendorName" name="vendorName" required></input>

                    {/* <label for="vendorType">Vendor Type:</label> */}
                    <input placeholder="Vendor Type" type="text" id="vendorType" name="vendorType" required></input>

                    {/* <label for="active">Active:</label>
                    <select id="active" name="active" required>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select> */}
                </div>

                <div class="sidefields">
                    {/* <label for="addressLine1">Address-Line 1:</label> */}
                    <input placeholder="Adress-Line 1" type="text" id="addressLine1" name="addressLine1" required></input>

                    {/* <label for="addressLine2">Address-Line 2:</label> */}
                    <input placeholder="Adress-Line 2" type="text" id="addressLine2" name="addressLine2"></input>
                </div>
                <div class="sidefields">
                    {/* <label for="city">City:</label> */}
                    <input placeholder="City" type="text" id="city" name="city" required></input>
                    {/* <label for="state">State:</label> */}
                    <input placeholder="State" type="text" id="state" name="state" required></input>
                </div>
                <div class="sidefields">
                    {/* <label for="pinCode">Pin Code:</label> */}
                    <input placeholder="Pincode" type="text" id="pinCode" name="pinCode" required></input>
                    {/* <label for="country">Country:</label> */}
                    <input placeholder="Country" type="text" id="country" name="country" required ></input>
                </div>
                <div class="sidefields">
                    {/* <label for="telephone1">Telephone 1:</label> */}
                    <input placeholder="Telephone 1" type="tel" id="telephone1" name="telephone1" required></input>
                    {/* <label for="telephone2">Telephone 2:</label> */}
                    <input placeholder="Telephone 2" type="tel" id="telephone2" name="telephone2"></input>
                </div>
                <div class="sidefields">
                    {/* <label for="vendorEmail">Vendor Email:</label> */}
                    <input placeholder="Email" type="email" id="vendorEmail" name="vendorEmail" required></input>
                    {/* <label for="vendorWebsite">Vendor Web Site:</label> */}
                    <input placeholder="Website Link" type="text" id="vendorWebsite" name="vendorWebsite"></input>
                </div>
               
                <AddProduct />

                <button className="addvendors">Add Vendors</button>

            </form>
        </div >

    )
}


export default Addvendors