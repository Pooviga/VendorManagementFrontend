import { React, useContext, useEffect, useState } from "react";

import "../EditProductPurchaseDetails/EditProductPurchaseDetails.css";

import DataContext from "../../DataContext/DataContext";

import AddProduct from "../AddProduct/AddProduct";

import TextField from "@mui/material/TextField";

import Popup from "reactjs-popup";

import axios from "axios";

function EditProductPurchaseDetails(props) {
  const [purchaseOrderWithUsersName, setPurchaseOrderWithUsersName] = useState({
    ...props.purchaseOrderWithUsersName,
  });

  const [purchaseProducts, setPurchaseProducts] = useState(
    props.purchaseProducts
  );

  const [vendor, setVendor] = useState({ ...props.vendorForPurchaseOrder });
  const [total, setTotal] = useState(0);

  const { navigate, postVendor, postPurchaseOrder, id } =
    useContext(DataContext);

  const { vendorDetails, setVendorDetails, productDetails, setProductDetails } =
    useContext(DataContext);

  const [showError, setShowError] = useState(false);

  const updatePurchaseOrder = () => {
    let values = purchaseProducts.filter((data) => Number(data.quantity) > 0);
    if (values.length == 0) {
      setShowError(true);
    }
    let updateValues = {
      createdBy: purchaseOrderWithUsersName.createdBy.id,
      billingAddress: purchaseOrderWithUsersName.billingAddress,
      billingAddressCity: purchaseOrderWithUsersName.billingAddressCity,
      billingAddressState: purchaseOrderWithUsersName.billingAddressState,
      billingAddressCountry: purchaseOrderWithUsersName.billingAddressCountry,
      billingAddressZipcode: purchaseOrderWithUsersName.billingAddressZipcode,
      shippingAddress: purchaseOrderWithUsersName.shippingAddress,
      shippingAddressCity: purchaseOrderWithUsersName.shippingAddressCity,
      shippingAddressState: purchaseOrderWithUsersName.shippingAddressState,
      shippingAddressCountry: purchaseOrderWithUsersName.shippingAddressCountry,
      shippingAddressZipcode: purchaseOrderWithUsersName.shippingAddressZipcode,
      termsAndConditions: purchaseOrderWithUsersName.termsAndConditions,
      description: purchaseOrderWithUsersName.description,
      productsPurchased: values.map((data) => {
        return {
          vendorId: vendor.id,
          purchaseOrderId: purchaseOrderWithUsersName.id,
          productId: data.productId,
          quantity: Number(data.quantity),
        };
      }),
    };
    if (values.length > 0) {
      axios
        .put(
          `https://localhost:7017/PurchaseOrder/${purchaseOrderWithUsersName.id}`,
          updateValues
        )
        .then((response) => {
          console.log(response);
        });
    }
  };

  var count = 0;

  const user = JSON.parse(localStorage.getItem("User"));

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
        productFilter(vendor.id);
      });
    });
  }, []);

  //filter prodects of specific vendor

  function productFilter(id) {
    setVId(id);

    axios

      .get("https://localhost:7017/api/VendorDetails/" + id)

      .then((response) => {
        let values = response.data.productDetails;
        let finalProducts = [...purchaseProducts];
        values = values.map((data) => {
          return {
            productId: data.id,
            price: Number(data.price),
            productDescription: data.productDescription,
            productName: data.productName,
            quantity: 0,
          };
        });
        let prodIds = [];
        values.forEach((value) => prodIds.push(value.productId));
        finalProducts.forEach((prod) => {
          if (prodIds.includes(prod.productId)) {
            prodIds.splice(prodIds.indexOf(prod.productId), 1);
          }
        });
        values.forEach((val) => {
          if (prodIds.includes(val.productId)) {
            finalProducts.push(val);
          }
        });
        setPurchaseProducts(finalProducts);

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
    const filteredArray = orderedProducts.filter(
      (object) => object.quantity !== 0
    );

    setOrderedProducts(filteredArray);
  };

  const [newPurchaseOrder, setNewPurchaseOrder] = useState({
    createdBy: user.id,

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
    <form className="purchaseForm">
      <h1>Edit Purchase Order</h1>

      <div>
        <div class="sidefields">
          <input
            placeholder="Enter title"
            type="text"
            id="description"
            name="description"
            value={purchaseOrderWithUsersName.description}
            onChange={(e) => {
              setPurchaseOrderWithUsersName({
                ...purchaseOrderWithUsersName,
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
            value={purchaseOrderWithUsersName.billingAddress}
            onChange={(e) => {
              setPurchaseOrderWithUsersName({
                ...purchaseOrderWithUsersName,
                billingAddress: e.target.value,
              });
            }}
          ></input>

          <input
            placeholder="Billing Adress City"
            type="text"
            id="billingAddressCity"
            name="billingAddressCity"
            value={purchaseOrderWithUsersName.billingAddressCity}
            onChange={(e) => {
              setPurchaseOrderWithUsersName({
                ...purchaseOrderWithUsersName,
                billingAddressCity: e.target.value,
              });
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
            value={purchaseOrderWithUsersName.billingAddressState}
            onChange={(e) => {
              setPurchaseOrderWithUsersName({
                ...purchaseOrderWithUsersName,
                billingAddressState: e.target.value,
              });
            }}
          ></input>

          {/* <label htmlFor="addressLine2">Address-Line 2:</label> */}

          <input
            placeholder="Billing Address Country"
            type="text"
            id="billingAddressCountry"
            value={purchaseOrderWithUsersName.billingAddressCountry}
            onChange={(e) => {
              setPurchaseOrderWithUsersName({
                ...purchaseOrderWithUsersName,
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
            value={purchaseOrderWithUsersName.shippingAddress}
            onChange={(e) => {
              setPurchaseOrderWithUsersName({
                ...purchaseOrderWithUsersName,
                shippingAddress: e.target.value,
              });
            }}
          ></input>

          {/* <label htmlFor="state">State:</label> */}

          <input
            placeholder="shippingAddressCity"
            type="text"
            id="shippingAddressCity"
            value={purchaseOrderWithUsersName.shippingAddressCity}
            onChange={(e) => {
              setPurchaseOrderWithUsersName({
                ...purchaseOrderWithUsersName,
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
            value={purchaseOrderWithUsersName.shippingAddressState}
            onChange={(e) => {
              setPurchaseOrderWithUsersName({
                ...purchaseOrderWithUsersName,
                shippingAddressState: e.target.value,
              });
            }}
          ></input>

          {/* <label htmlFor="country">Country:</label> */}

          <input
            placeholder="Shipping Address Country"
            type="text"
            id="shippingAddressCountry"
            value={purchaseOrderWithUsersName.shippingAddressCountry}
            onChange={(e) => {
              setPurchaseOrderWithUsersName({
                ...purchaseOrderWithUsersName,
                shippingAddressCountry: e.target.value,
              });
            }}
          ></input>
        </div>

        <div class="sidefields">
          {/* <label htmlFor="telephone1">Telephone 1:</label> */}

          <input
            placeholder="Shipping Address Zipcode "
            type="number"
            id="shippingAddressZipcode"
            value={purchaseOrderWithUsersName.shippingAddressZipcode}
            onChange={(e) => {
              setPurchaseOrderWithUsersName({
                ...purchaseOrderWithUsersName,
                shippingAddressZipcode: e.target.value,
              });
            }}
          ></input>

          {/* <label htmlFor="telephone2">Telephone 2:</label> */}

          <input
            placeholder="billing Address Zipcode "
            type="number"
            id="billingAddressZipcode"
            value={purchaseOrderWithUsersName.billingAddressZipcode}
            onChange={(e) => {
              setPurchaseOrderWithUsersName({
                ...purchaseOrderWithUsersName,
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
            value={purchaseOrderWithUsersName.termsAndConditions}
            onChange={(e) => {
              setPurchaseOrderWithUsersName({
                ...purchaseOrderWithUsersName,
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
              Selected Vendor:
            </label>
          </div>

          <select id="colours" disabled>
            {vendorDetails.map((v) => {
              if (vendor.id == v.id) {
                return (
                  <option selected value={v.id}>
                    {v.vendorName}
                  </option>
                );
              }
            })}
          </select>
        </div>

        {status ? <p className="error-color">Invalid credentials</p> : <></>}

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
              {purchaseProducts.map((x, index) => {
                return (
                  <tr>
                    <td>{x.productName}</td>

                    <td>₹{x.price}</td>

                    <td>
                      <input
                        type="number"
                        value={x.quantity}
                        onChange={(e) => {
                          let val = {
                            ...x,
                            quantity: e.target.value,
                          };
                          let li = [...purchaseProducts];
                          li[index] = val;
                          setPurchaseProducts(li);
                          setShowError(false);
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
      {showError && (
        <p className="error-color">Atleast get a quantity of product</p>
      )}
      <button
        className="addvendors"
        onClick={(e) => {
          {
            updatePurchaseOrder();
            e.preventDefault();
          }
        }}
      >
        Submit
      </button>
    </form>

    // </div>
  );
}

export default EditProductPurchaseDetails;
