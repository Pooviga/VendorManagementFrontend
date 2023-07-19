import { React, useContext, useEffect, useState } from "react";
import "../Addvendors/addvendors.css";
import DataContext from "../../DataContext/DataContext";
import AddProduct from "../AddProduct/AddProduct";
import TextField from "@mui/material/TextField";
import Popup from "reactjs-popup";
import axios from "axios";

function Addvendors() {
  const [total, setTotal] = useState(0);
  const { navigate, postVendor, postPurchaseOrder } = useContext(DataContext);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const { vendorDetails, setVendorDetails, productDetails, setProductDetails } =
    useContext(DataContext);
  var count = 0

  //to extract all vendor ids
  const vendorIds = vendorDetails.map((vendorDetails) => vendorDetails.id);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [vId, setVId] = useState();
  const [pd, setPd] = useState([]);
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

    setVId(id);
    axios
      .get("https://localhost:7017/api/VendorDetails/" + id)
      .then((response) => {

        setFilteredProducts(response.data.productDetails);
      });
  }



  let status = false;


  // { vendorId:(s.vendorId),
  //  purchaseOrderId:"00000000-0000-0000-0000-000000000000",
  //  productId:(s.id),
  //  quantity:0}


  //code for adding ordered products with quantity

  const updateObjectAtIndex = (index, newObject) => {
    // Create a shallow copy of the original array
    const newArray = [...orderedProducts];

    // Update the desired object at the specified index
    newArray[index] = newObject;

    // Update the state with the modified array
    setOrderedProducts(newArray);
  };

  const removeObjectsWithZeroQuantity = () => {
    const filteredArray = orderedProducts.filter(object => object.quantity !== 0);
    setOrderedProducts(filteredArray);
  };

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
    productsPurchased: []
  });

  return (
    // <div className="wholevendors">

    <form>
      <div className="top">
        <h1>Purchase order</h1>
      </div>
      <div className="purchaseorderview">
        <div>
          <input type="hidden" id="userId"></input>
          <div class="sidefields">

            <input
              placeholder="Enter title"
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
          </div>
          <div class="sidefields">

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

                }
              }}
            ></input>

            <input
              placeholder="Billing Adress City"
              type="text"
              id="billingAddressCity"
              name="billingAddressCity"
              required
              onChange={(e) => {
                {
                  setNewPurchaseOrder({
                    ...newPurchaseOrder,
                    billingAddressCity: e.target.value,
                  });

                }
              }}
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
              placeholder="shippingAddressCity"
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
              placeholder="billing Address Zipcode "
              type="tel"
              id="billingAddressZipcode"
              name="billingAddressZipcode"
              required
              onChange={(e) => {
                setNewPurchaseOrder({
                  ...newPurchaseOrder,
                  billingAddressZipcode: e.target.value,
                });
              }}
            ></input>
          </div>
          <div class="sidefields">
            {/* <label htmlFor="vendorEmail">Vendor Email:</label> */}
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
          {status ? <p className='error-color'>Invalid credentials</p> : <></>}

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

                          onChange={(e) => {
                            if (e.target.value >= 0) {

                              updateObjectAtIndex(index,
                                {
                                  vendorId: (x.vendorId),
                                  purchaseOrderId: "00000000-0000-0000-0000-000000000000",
                                  productId: (x.id),
                                  quantity: Number(e.target.value)
                                })

                            }

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
            {
              console.log("before:", orderedProducts)
              const filteredArray = orderedProducts.filter(object => object.quantity !== 0);
              console.log("after", filteredArray);
              console.log("after", filteredArray);
              if (filteredArray.length === 0) {
                console.log("empty");
                status = true;
                console.log(status);
              } else {
                console.log('filled');
                postPurchaseOrder({ ...newPurchaseOrder, productsPurchased: filteredArray });

              }


              e.preventDefault();

            }
          }}
        >
          Add Purchase Order
        </button>
        {status && <p className='error-color'>Invalid credentials</p>}
      </div>
    </form>
    // </div>
  );
}

export default Addvendors;
