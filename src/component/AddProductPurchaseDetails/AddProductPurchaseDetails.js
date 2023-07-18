import { React, useContext, useEffect, useState } from "react";
import "../Addvendors/addvendors.css";
import DataContext from "../../DataContext/DataContext";
import AddProduct from "../AddProduct/AddProduct";
import TextField from "@mui/material/TextField";
import Popup from "reactjs-popup";
import axios from "axios";

function Addvendors() {
  const [total, setTotal] = useState(0);
  const { navigate, postVendor } = useContext(DataContext);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const { vendorDetails, setVendorDetails, productDetails, setProductDetails } =
    useContext(DataContext);

  //to extract all vendor ids
  const vendorIds = vendorDetails.map((vendorDetails) => vendorDetails.id);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);

  var vData = [];
  var pData = [];

  //fetch vendor details
  useEffect(() => {
    axios.get("https://localhost:7017/api/VendorDetails").then((response) => {
      response.data.map((newData) => {
        vData.push(newData.vendorDetails);
        setVendorDetails(vData);
        pData.push(newData.productDetails);
        setProductDetails(pData);
      });
    });
  }, []);

  //filter prodects of specific vendor
  function productFilter(id) {
    console.log(id);
    axios
      .get("https://localhost:7017/api/VendorDetails/" + id)
      .then((response) => {
        console.log(response.data);
        setFilteredProducts(response.data.productDetails);
      });
  }

  console.log("filtered products", filteredProducts);
  // setOrderedProducts(filteredProducts.map((s) => {
  //   "vendorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //     "purchaseOrderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //     "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //     "quantity": 0

  // }));

  const [newPurchaseOrder, setNewPurchaseOrder] = useState({
    createdBy: 0,
    billingAddress: " ",
    billingAddressCity: " ",
    billingAddressState: " ",
    billingAddressCountry: " ",
    billingAddressZipcode: " ",
    shippingAddress: " ",
    shippingAddressCity: " ",
    shippingAddressState: " ",
    shippingAddressCountry: " ",
    shippingAddressZipcode: " ",
    termsAndConditions: " ",
    description: " ",
    productsPurchased: [],
  });

  return (
    <div className="wholevendors">
      {/* Form htmlFor adding or updating a vendor */}
      <form id="vendorForm">
        <div className="top">
          <h1>Purchase order</h1>
        </div>
        <div className="formdetails">
          <input type="hidden" id="userId"></input>
          <div className="sidefields">
            {/* <label for="vendorName">Vendor Name:</label> */}
            <input
              placeholder="Billing Adress"
              type="text"
              id="billingAddress"
              name="billingAddress"
              required
              onChange={(e) => {
                {
                  setNewPurchaseOrder({
                    ...newPurchaseOrder,
                    billingAddress: e.target.value,
                  });
                  console.log("billing", newPurchaseOrder.billingAddress);
                }
              }}
            ></input>
            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}

            {/* <label htmlFor="vendorType">Vendor Type:</label> */}
            <input
              placeholder="Billing Adress City"
              type="text"
              id="billingAddressCity"
              name="billingAddressCity"
              required
            ></input>
          </div>

          <div class="sidefields">
            {/* <label htmlFor="addressLine1">Address-Line 1:</label> */}
            <input
              placeholder="Billing Address State"
              type="text"
              id="billingAddressState"
              name="billingAddressState"
              required
              onChange={(e) => {
                setNewPurchaseOrder({
                  ...newPurchaseOrder,
                  billingAddressState: e.target.value,
                });
              }}
            ></input>

            {/* <label htmlFor="addressLine2">Address-Line 2:</label> */}
            <input
              placeholder="Billing Address Country"
              type="text"
              id="billingAddressCountry"
              name="addresbillingAddressCountrysLine2"
              onChange={(e) => {
                setNewPurchaseOrder({
                  ...newPurchaseOrder,
                  billingAddressCountry: e.target.value,
                });
              }}
            ></input>
          </div>
          <div class="sidefields">
            {/* <label htmlFor="city">City:</label> */}
            <input
              placeholder="Shipping Address"
              type="text"
              id="shippingAddress"
              name="shippingAddress"
              required
              onChange={(e) => {
                setNewPurchaseOrder({
                  ...newPurchaseOrder,
                  shippingAddress: e.target.value,
                });
              }}
            ></input>
            {/* <label htmlFor="state">State:</label> */}
            <input
              placeholder="State"
              type="text"
              id="shippingAddressCity"
              name="shippingAddressCity"
              required
              onChange={(e) => {
                setNewPurchaseOrder({
                  ...newPurchaseOrder,
                  shippingAddressCity: e.target.value,
                });
              }}
            ></input>
          </div>
          <div class="sidefields">
            {/* <label htmlFor="pinCode">Pin Code:</label> */}
            <input
              placeholder="Shipping Address State"
              type="text"
              id="shippingAddressState"
              name="shippingAddressState"
              required
              onChange={(e) => {
                setNewPurchaseOrder({
                  ...newPurchaseOrder,
                  shippingAddressState: e.target.value,
                });
              }}
            ></input>
            {/* <label htmlFor="country">Country:</label> */}
            <input
              placeholder="Shipping Address Country"
              type="text"
              id="shippingAddressCountry"
              name="shippingAddressCountry"
              required
              onChange={(e) => {
                setNewPurchaseOrder({
                  ...newPurchaseOrder,
                  shippingAddressCountry: e.target.value,
                });
              }}
            ></input>
          </div>
          <div class="sidefields">
            {/* <label htmlFor="telephone1">Telephone 1:</label> */}
            <input
              placeholder="Shipping Address Zipcode "
              type="tel"
              id="shippingAddressZipcode"
              name="shippingAddressZipcode"
              required
              onChange={(e) => {
                setNewPurchaseOrder({
                  ...newPurchaseOrder,
                  shippingAddressZipcode: e.target.value,
                });
              }}
            ></input>
            {/* <label htmlFor="telephone2">Telephone 2:</label> */}
            <input
              placeholder="Terms and Conditions"
              type="tel"
              id="termsAndConditions"
              name="termsAndConditions"
              onChange={(e) => {
                setNewPurchaseOrder({
                  ...newPurchaseOrder,
                  termsAndConditions: e.target.value,
                });
              }}
            ></input>
          </div>
          <div class="sidefields">
            {/* <label htmlFor="vendorEmail">Vendor Email:</label> */}
            <input
              placeholder="Description"
              type="text"
              id="description"
              name="description"
              required
              onChange={(e) => {
                setNewPurchaseOrder({
                  ...newPurchaseOrder,
                  description: e.target.value,
                });
              }}
            ></input>
            {/* <label htmlFor="vendorWebsite">Vendor Web Site:</label> */}
            {/* <input placeholder="Website Link" type="text" id="vendorWebsite" name="vendorWebsite" onChange={(e) => { setNewPurchaseOrder({ ...newPurchaseOrder, vendorWebsite: e.target.value }) }}></input> */}
          </div>
          <div className="second-input">
            <div className="sidefield">
              <label
                className="pdlabel"
                style={{ margin: "10px", fontSize: "24px" }}
                for="productDetails"
              >
                Select Vendor:
              </label>
            </div>
            <select
              id="colours"
              onChange={(e) => {
                {
                  console.log(e.target.value);
                  productFilter(e.target.value);
                }
              }}
            >
              <option></option>
              {vendorDetails.map((v) => (
                <option value={v.id}>{v.vendorName}</option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="row">
              <div className="sidefield">
                <label
                  className="pdlabel"
                  style={{ margin: "10px", fontSize: "24px" }}
                  for="productDetails"
                >
                  Product Details:
                </label>
              </div>
            </div>
            <div className="col-sm-8">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col"> unit price</th>
                    <th scope="col">quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((x, index) => {
                    return (
                      <tr>
                        <td>{x.productName}</td>
                        <td>₹{x.price}</td>
                        <td>
                          <input
                            type="number"
                            id="firstNumber"
                            onChange={(e) => {
                              {if (e.target.value>0) {                                
                                newPurchaseOrder.productsPurchased=[...newPurchaseOrder.productsPurchased,{                                    
                                  vendorId:(x.vendorId),
                                  purchaseOrderId:"00000000-0000-0000-0000-000000000000",
                                  productId:(x.id),
                                  quantity: (e.target.value),}]
                              }};
                              console.log(newPurchaseOrder)
                            }}
                          ></input>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <button
            className="addvendors"
            onClick={(e) => {
              e.preventDefault();
              // postNewPurchase(newPurchaseOrder);
            }}
          >
            Add Purchase Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default Addvendors;
