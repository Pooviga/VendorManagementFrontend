import { React, useContext, useEffect, useState } from "react";

import "../EditProductPurchaseDetails/EditProductPurchaseDetails.css";

import DataContext from "../../DataContext/DataContext";

import AddProduct from "../AddProduct/AddProduct";

import TextField from "@mui/material/TextField";

import Popup from "reactjs-popup";

import axios from "axios";
import { useFormik } from "formik";
import { purchaseOrderSchema } from "../../schemas";

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

  const {
    values,
    errors,
    setErrors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      billingAddress: "",
      billingAddressCity: "",
      billingAddressState: "",
      billingAddressCountry: "",
      billingAddressZipcode: "",
      shippingAddress: "",
      shippingAddressCity: "",
      shippingAddressState: "",
      shippingAddressCountry: "",
      shippingAddressZipcode: "",
      termsAndConditions: "",
      description: "",
    },
    validationSchema: purchaseOrderSchema,
  });
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
          <div style={{ width: "100%" }}>
            <input
              placeholder="Enter title"
              type="text"
              id="description"
              value={purchaseOrderWithUsersName.description}
              onChange={(e) => {
                handleChange(e);
                setPurchaseOrderWithUsersName({
                  ...purchaseOrderWithUsersName,
                  description: e.target.value,
                });
              }}
              onBlur={handleBlur}
              className={
                errors.description && touched.description ? "input-error" : ""
              }
            ></input>
            {errors.description && touched.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
        </div>

        <div class="sidefields">
          <div className="side1">
            <input
              placeholder="Billing Adress"
              type="text"
              id="billingAddress"
              value={purchaseOrderWithUsersName.billingAddress}
              onChange={(e) => {
                handleChange(e);
                setPurchaseOrderWithUsersName({
                  ...purchaseOrderWithUsersName,
                  billingAddress: e.target.value,
                });
              }}
              onBlur={handleBlur}
              className={
                errors.billingAddress && touched.billingAddress
                  ? "input-error"
                  : ""
              }
            ></input>
            {errors.billingAddress && touched.billingAddress && (
              <p className="error">{errors.billingAddress}</p>
            )}
          </div>
          <div className="side2">
            <input
              placeholder="Billing Adress City"
              type="text"
              id="billingAddressCity"
              value={purchaseOrderWithUsersName.billingAddressCity}
              onChange={(e) => {
                handleChange(e);
                setPurchaseOrderWithUsersName({
                  ...purchaseOrderWithUsersName,
                  billingAddressCity: e.target.value,
                });
              }}
              onBlur={handleBlur}
              className={
                errors.billingAddressCity && touched.billingAddressCity
                  ? "input-error"
                  : ""
              }
            ></input>
            {errors.billingAddressCity && touched.billingAddressCity && (
              <p className="error">{errors.billingAddressCity}</p>
            )}
          </div>
        </div>

        <div class="sidefields">
          {/* <label htmlFor="addressLine1">Address-Line 1:</label> */}
          <div className="side1">
            <input
              placeholder="Billing Address State"
              type="text"
              id="billingAddressState"
              value={purchaseOrderWithUsersName.billingAddressState}
              onChange={(e) => {
                handleChange(e);
                setPurchaseOrderWithUsersName({
                  ...purchaseOrderWithUsersName,
                  billingAddressState: e.target.value,
                });
              }}
              onBlur={handleBlur}
              className={
                errors.billingAddressState && touched.billingAddressState
                  ? "input-error"
                  : ""
              }
            ></input>
            {errors.billingAddressState && touched.billingAddressState && (
              <p className="error">{errors.billingAddressState}</p>
            )}
          </div>
          {/* <label htmlFor="addressLine2">Address-Line 2:</label> */}
          <div className="side2">
            <input
              placeholder="Billing Address Country"
              type="text"
              id="billingAddressCountry"
              value={purchaseOrderWithUsersName.billingAddressCountry}
              onChange={(e) => {
                handleChange(e);
                setPurchaseOrderWithUsersName({
                  ...purchaseOrderWithUsersName,
                  billingAddressCountry: e.target.value,
                });
              }}
              onBlur={handleBlur}
              className={
                errors.billingAddressCountry && touched.billingAddressCountry
                  ? "input-error"
                  : ""
              }
            ></input>
            {errors.billingAddressCountry && touched.billingAddressCountry && (
              <p className="error">{errors.billingAddressCountry}</p>
            )}
          </div>
        </div>

        <div class="sidefields">
          {/* <label htmlFor="city">City:</label> */}
          <div className="side1">
            <input
              placeholder="Shipping Address"
              type="text"
              id="shippingAddress"
              value={purchaseOrderWithUsersName.shippingAddress}
              onChange={(e) => {
                handleChange(e);
                setPurchaseOrderWithUsersName({
                  ...purchaseOrderWithUsersName,
                  shippingAddress: e.target.value,
                });
              }}
              onBlur={handleBlur}
              className={
                errors.shippingAddress && touched.shippingAddress
                  ? "input-error"
                  : ""
              }
            ></input>
            {errors.shippingAddress && touched.shippingAddress && (
              <p className="error">{errors.shippingAddress}</p>
            )}
          </div>
          {/* <label htmlFor="state">State:</label> */}
          <div className="side2">
            <input
              placeholder="shippingAddressCity"
              type="text"
              id="shippingAddressCity"
              value={purchaseOrderWithUsersName.shippingAddressCity}
              onChange={(e) => {
                handleChange(e);
                setPurchaseOrderWithUsersName({
                  ...purchaseOrderWithUsersName,
                  shippingAddressCity: e.target.value,
                });
              }}
              onBlur={handleBlur}
              className={
                errors.shippingAddressCity && touched.shippingAddressCity
                  ? "input-error"
                  : ""
              }
            ></input>
            {errors.shippingAddressCity && touched.shippingAddressCity && (
              <p className="error">{errors.shippingAddressCity}</p>
            )}
          </div>
        </div>

        <div class="sidefields">
          {/* <label htmlFor="pinCode">Pin Code:</label> */}
          <div className="side1">
            <input
              placeholder="Shipping Address State"
              type="text"
              id="shippingAddressState"
              value={purchaseOrderWithUsersName.shippingAddressState}
              onChange={(e) => {
                handleChange(e);
                setPurchaseOrderWithUsersName({
                  ...purchaseOrderWithUsersName,
                  shippingAddressState: e.target.value,
                });
              }}
              onBlur={handleBlur}
              className={
                errors.shippingAddressState && touched.shippingAddressState
                  ? "input-error"
                  : ""
              }
            ></input>
            {errors.shippingAddressState && touched.shippingAddressState && (
              <p className="error">{errors.shippingAddressState}</p>
            )}
          </div>
          {/* <label htmlFor="country">Country:</label> */}
          <div className="side2">
            <input
              placeholder="Shipping Address Country"
              type="text"
              id="shippingAddressCountry"
              value={purchaseOrderWithUsersName.shippingAddressCountry}
              onChange={(e) => {
                handleChange(e);
                setPurchaseOrderWithUsersName({
                  ...purchaseOrderWithUsersName,
                  shippingAddressCountry: e.target.value,
                });
              }}
              onBlur={handleBlur}
              className={
                errors.shippingAddressCountry && touched.shippingAddressCountry
                  ? "input-error"
                  : ""
              }
            ></input>
            {errors.shippingAddressCountry &&
              touched.shippingAddressCountry && (
                <p className="error">{errors.shippingAddressCountry}</p>
              )}
          </div>
        </div>

        <div class="sidefields">
          {/* <label htmlFor="telephone1">Telephone 1:</label> */}
          <div className="side1">
            <input
              placeholder="Shipping Address Zipcode "
              type="number"
              id="shippingAddressZipcode"
              value={purchaseOrderWithUsersName.shippingAddressZipcode}
              onChange={(e) => {
                handleChange(e);
                setPurchaseOrderWithUsersName({
                  ...purchaseOrderWithUsersName,
                  shippingAddressZipcode: e.target.value,
                });
              }}
              onBlur={handleBlur}
              className={
                errors.shippingAddressZipcode && touched.shippingAddressZipcode
                  ? "input-error"
                  : ""
              }
            ></input>
            {errors.shippingAddressZipcode &&
              touched.shippingAddressZipcode && (
                <p className="error">{errors.shippingAddressZipcode}</p>
              )}
          </div>
          {/* <label htmlFor="telephone2">Telephone 2:</label> */}
          <div className="side2">
            <input
              placeholder="billing Address Zipcode "
              type="number"
              id="billingAddressZipcode"
              value={purchaseOrderWithUsersName.billingAddressZipcode}
              onChange={(e) => {
                handleChange(e);
                setPurchaseOrderWithUsersName({
                  ...purchaseOrderWithUsersName,
                  billingAddressZipcode: e.target.value,
                });
              }}
              onBlur={handleBlur}
              className={
                errors.billingAddressZipcode && touched.billingAddressZipcode
                  ? "input-error"
                  : ""
              }
            ></input>
            {errors.billingAddressZipcode && touched.billingAddressZipcode && (
              <p className="error">{errors.billingAddressZipcode}</p>
            )}
          </div>
        </div>

        <div class="sidefields">
          {/* <label htmlFor="vendorEmail">Vendor Email:</label> */}
          <div style={{ width: "100%" }}>
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
          </div>
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
