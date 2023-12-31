import { React, useContext, useEffect, useState } from "react";
import "../AddProductPurchaseDetails/AddProductPurchaseDetails.css";
import DataContext from "../../DataContext/DataContext";
import axios from "axios";
import { useFormik } from "formik";
import { purchaseOrderSchema } from "../../schemas";

function AddProductPurchaseDetails(props) {
  const userData = JSON.parse(localStorage.getItem("User"));
  const userid = userData.id;
  const [total, setTotal] = useState(0);
  const { postPurchaseOrder } = useContext(DataContext);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const { vendorDetails, setVendorDetails, productDetails, setProductDetails } =
    useContext(DataContext);
  var count = 0;
  //to extract all vendor ids

  const vendorIds = vendorDetails.map((vendorDetails) => vendorDetails.id);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [vId, setVId] = useState();
  const [pd, setPd] = useState([]);
  var vData = [];
  var pData = [];
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
        console.log(response.data);
        setFilteredProducts(response.data.productDetails);
      });
  }
  const addPurchaseOrder = (popupclose) => {
    const temp = { ...newPurchaseOrder, ...values };
    setNewPurchaseOrder({ ...newPurchaseOrder, ...values });
    const filteredArray = orderedProducts.filter(
      (object) => object.quantity !== 0
    );
    if (filteredArray.length === 0) {
      console.log("empty");
      setStatus(true);
    } else {
      setStatus(false);
      console.log("po", {
        ...newPurchaseOrder,
        productsPurchased: filteredArray,
      });
      postPurchaseOrder(
        {
          ...temp,
          productsPurchased: filteredArray,
        },
        popupclose
      );
    }
  };
  const [status, setStatus] = useState(false);

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
    createdBy: userid,
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
    termsAndConditions: " ",
    description: " ",
    productsPurchased: [],
  });

  return (
    <div
      style={{
        height: "450px",
        overflowY: "scroll",
        backgroundColor: "white",
        padding: "10px",
        border: "3px solid #091644",
      }}
    >
      <form className="purchaseForm">
        <h1>Purchase order</h1>
        <div>
          <div class="sidefields">
            <div style={{ width: "100%" }}>
              <input
                placeholder="Enter Title"
                type="text"
                id="description"
                value={values.description}
                onChange={handleChange}
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
                placeholder="Billing Address"
                type="text"
                id="billingAddress"
                value={values.billingAddress}
                onChange={handleChange}
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
                value={values.billingAddressCity}
                onChange={handleChange}
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
            <div className="side1">
              <input
                placeholder="Billing Address State"
                type="text"
                id="billingAddressState"
                value={values.billingAddressState}
                onChange={handleChange}
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
            <div className="side2">
              <input
                placeholder="Billing Address Country"
                type="text"
                id="billingAddressCountry"
                value={values.billingAddressCountry}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.billingAddressCountry && touched.billingAddressCountry
                    ? "input-error"
                    : ""
                }
              ></input>
              {errors.billingAddressCountry &&
                touched.billingAddressCountry && (
                  <p className="error">{errors.billingAddressCountry}</p>
                )}
            </div>
          </div>

          <div class="sidefields">
            <div className="side1">
              <input
                placeholder="Shipping Address"
                type="text"
                id="shippingAddress"
                value={values.shippingAddress}
                onChange={handleChange}
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
            <div className="side2">
              <input
                placeholder="shippingAddressCity"
                type="text"
                id="shippingAddressCity"
                value={values.shippingAddressCity}
                onChange={handleChange}
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
            <div className="side1">
              <input
                placeholder="Shipping Address State"
                type="text"
                id="shippingAddressState"
                value={values.shippingAddressState}
                onChange={handleChange}
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
            <div className="side2">
              <input
                placeholder="Shipping Address Country"
                type="text"
                id="shippingAddressCountry"
                value={values.shippingAddressCountry}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.shippingAddressCountry &&
                  touched.shippingAddressCountry
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
            <div className="side1">
              <input
                placeholder="Shipping Address Zipcode "
                type="tel"
                id="shippingAddressZipcode"
                value={values.shippingAddressZipcode}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.shippingAddressZipcode &&
                  touched.shippingAddressZipcode
                    ? "input-error"
                    : ""
                }
              ></input>
              {errors.shippingAddressZipcode &&
                touched.shippingAddressZipcode && (
                  <p className="error">{errors.shippingAddressZipcode}</p>
                )}
            </div>
            <div className="side2">
              <input
                placeholder="billing Address Zipcode "
                type="tel"
                id="billingAddressZipcode"
                value={values.billingAddressZipcode}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.billingAddressZipcode && touched.billingAddressZipcode
                    ? "input-error"
                    : ""
                }
              ></input>
              {errors.billingAddressZipcode &&
                touched.billingAddressZipcode && (
                  <p className="error">{errors.billingAddressZipcode}</p>
                )}
            </div>
          </div>
          <div class="sidefields">
            <div style={{ width: "100%" }}>
              <input
                placeholder="Terms and Conditions"
                type="tel"
                id="termsAndConditions"
                value={values.termsAndConditions}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.termsAndConditions && touched.termsAndConditions
                    ? "input-error"
                    : ""
                }
              ></input>
              {errors.termsAndConditions && touched.termsAndConditions && (
                <p className="error">{errors.termsAndConditions}</p>
              )}
            </div>
          </div>
          <div className="second-input">
            <div className="sidefield">
              <label
                className="pdlabel"
                style={{ fontSize: "18px" }}
                for="productDetails"
              >
                <p>Select Vendor:</p>
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

          <div>
            <div className="sidefield">
              <label
                className="pdlabel"
                style={{ fontSize: "18px" }}
                for="productDetails"
              >
                <p>Product Details:</p>
              </label>
            </div>
          </div>
          <br></br>

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
                            setStatus(false);
                            if (e.target.value >= 0) {
                              updateObjectAtIndex(
                                index,

                                {
                                  vendorId: x.vendorId,

                                  purchaseOrderId:
                                    "00000000-0000-0000-0000-000000000000",

                                  productId: x.id,

                                  quantity: Number(e.target.value),
                                }
                              );
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

        {status && (
          <p className="error-color">Atleast 1 product should be purchased</p>
        )}
        <br></br>
        <button
          className="addvendors"
          onClick={(e) => {
            {
              e.preventDefault();
              handleSubmit(e);
              addPurchaseOrder(props);
            }
          }}
        >
          Add Purchase Order
        </button>
      </form>
    </div>
  );
}

export default AddProductPurchaseDetails;
