import { React, useContext, useEffect, useState } from "react";
import "../EditVendor/EditVendor.css";
import DataContext from "../../DataContext/DataContext";
import axios from "axios";
import { useFormik } from "formik";
import { addVendorSchema } from "../../schemas";

function EditVendor(props) {
  const [vendors, setVendors] = useState({ ...props.vendorDetails });
  const [productVendorDetails, setProductVendorDetails] = useState(props.productDetails);
  var vdata = [];
  var pdata = [];

  const { vendorDetails, productDetails, setVendorDetails, setProductDetails } =
    useContext(DataContext); 
    const [details, setDetails] = useState([]);
  useEffect(() => {
    // setDetails(detail);
    // console.log(details);
  }, []);

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
      vendorName: "",
      vendorType: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      telePhone1: "",
      telePhone2: "",
      vendorEmail: "",
      vendorWebsite: "",
    },
    validationSchema: addVendorSchema,
  });

  const { navigate, postVendor } = useContext(DataContext);
  const [inputFields, setInputFields] = useState([
    {
      vendorId: "00000000-0000-0000-0000-000000000000",
      ProductName: "",
      ProductDescription: "",
      price: 0,
    },
  ]);

  const [showError, setShowError] = useState(false);
  const updateVendor = () => {
    let vendorDetail = {
      vendorName: vendors.vendorName,
      isActive: true,
      vendorType: vendors.vendorType,
      addressLine1: vendors.addressLine1,
      addressLine2: vendors.addressLine2,
      city: vendors.city,
      state: vendors.state,
      postalCode: vendors.postalCode,
      country: vendors.country,
      telePhone1: vendors.telePhone1,
      telePhone2: vendors.telePhone2,
      vendorEmail: vendors.vendorEmail,
      vendorWebsite: vendors.vendorWebsite,
      productDetailsRequest: [...productVendorDetails],
    };

    if (
      vendorDetail.productDetailsRequest.length == 1 &&
      (!vendorDetail.productDetailsRequest[0].productName ||
        !vendorDetail.productDetailsRequest[0].productDescription ||
        vendorDetail.productDetailsRequest[0] <= 0)
    ) {
      setShowError(true);
    } else {
      console.log("innn");
      let values = [];
      let mockData = [...vendorDetail.productDetailsRequest];
      mockData.forEach((val) => {
        if (val.productName && val.productDescription && val.price > 0) {
          values.push(val);
        }
      });
      if (values.length > 0) {
        setShowError(false);
        vendorDetail.productDetailsRequest = [...values];
        console.log("newvvv", vendorDetail);
        axios
          .put(
            `https://localhost:7017/api/VendorDetails/${vendors.id}`,
            vendorDetail
          )
          .then((response) => {
            axios.get("https://localhost:7017/api/VendorDetails").then((response) => {
              setDetails(response.data);
              response.data.map((newdata) => {
                vdata.push(newdata.vendorDetails);
                setVendorDetails(vdata);
                pdata.push(newdata.productDetails);
                setProductDetails(pdata);
              });
        
              console.log("asigned", vdata);
              console.log("asigned", pdata);
        
             
            });
            console.log(response);
            alert("Vendor Details Update Successfully ✔")
            props.close();
          });
      } else {
        setShowError(true);
      }
    }
  };

  const addInputField = (e) => {
    e.preventDefault();
    setProductVendorDetails([
      ...productVendorDetails,
      {
        id: "00000000-0000-0000-0000-000000000000",
        productName: "",
        productDescription: "",
        price: 0,
        isActive: true,
      },
    ]);
  };
  const removeInputFields = (e, index) => {
    const rows = [...productVendorDetails];
    rows.splice(index, 1);
    setProductVendorDetails(rows);
    e.preventDefault();
  };

  const [newVendor, setNewVendor] = useState({
    vendorName: "",
    isActive: true,
    vendorType: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    telePhone1: "",
    telePhone2: "",
    vendorEmail: "",
    vendorWebsite: "",
    productDetailsRequest: [],
  });
  function filter() {
    for (let i = 0; i < productVendorDetails.length; i++) {
      productVendorDetails[i].price = Number(productVendorDetails[i].price);
      delete productVendorDetails[i].vendorDetails;
      delete productVendorDetails[i]?.vendorId;
    }
  }
  return (
    <div
      style={{
        height: "450px",
        overflowY: "scroll",
        backgroundColor: "white",
        padding: "40px",
      }}
    >
      <form>
        <div className="top">
          <h1>Edit Vendor</h1>
        </div>
        <div className="formdetails">
          <input type="hidden" id="vendorId"></input>
          <div class="sidefields">
            <div className="side1">
              <input
                placeholder="Vendor Name"
                type="text"
                id="vendorName"
                value={vendors.vendorName}
                onChange={(e) => {
                  handleChange(e);
                  setVendors({ ...vendors, vendorName: e.target.value });
                }}
                onBlur={handleBlur}
                className={
                  errors.vendorName && touched.vendorName ? "input-error" : ""
                }
              ></input>
              {errors.vendorName && touched.vendorName && (
                <p className="error">{errors.vendorName}</p>
              )}
            </div>
            <div className="side2">
              <input
                placeholder="Vendor Type"
                type="text"
                id="vendorType"
                value={vendors.vendorType}
                onChange={(e) => {
                  handleChange(e);
                  setVendors({ ...vendors, vendorType: e.target.value });
                }}
                onBlur={handleBlur}
                className={
                  errors.vendorType && touched.vendorType ? "input-error" : ""
                }
              ></input>
              {errors.vendorType && touched.vendorType && (
                <p className="error">{errors.vendorType}</p>
              )}
            </div>
          </div>
          <div class="sidefields">
            <div className="side1">
              <input
                placeholder="Address-Line 1"
                type="text"
                id="addressLine1"
                value={vendors.addressLine1}
                onChange={(e) => {
                  handleChange(e);
                  setVendors({ ...vendors, addressLine1: e.target.value });
                }}
                onBlur={handleBlur}
                className={
                  errors.addressLine1 && touched.addressLine1
                    ? "input-error"
                    : ""
                }
              ></input>
              {errors.addressLine1 && touched.addressLine1 && (
                <p className="error">{errors.addressLine1}</p>
              )}
            </div>
            <div className="side2">
              <input
                placeholder="Address-Line 2"
                type="text"
                id="addressLine2"
                value={vendors.addressLine2}
                onChange={(e) => {
                  setVendors({ ...vendors, addressLine2: e.target.value });
                }}
              ></input>
            </div>
          </div>
          <div class="sidefields">
            <div className="side1">
              <input
                placeholder="City"
                type="text"
                id="city"
                value={vendors.city}
                onChange={(e) => {
                  handleChange(e);
                  setVendors({ ...vendors, city: e.target.value });
                }}
                onBlur={handleBlur}
                className={errors.city && touched.city ? "input-error" : ""}
              ></input>
              {errors.city && touched.city && (
                <p className="error">{errors.city}</p>
              )}
            </div>
            <div className="side2">
              <input
                placeholder="State"
                type="text"
                id="state"
                value={vendors.state}
                onChange={(e) => {
                  handleChange(e);
                  setVendors({ ...vendors, state: e.target.value });
                }}
                onBlur={handleBlur}
                className={errors.state && touched.state ? "input-error" : ""}
              ></input>
              {errors.state && touched.state && (
                <p className="error">{errors.state}</p>
              )}
            </div>
          </div>
          <div class="sidefields">
            <div className="side1">
              <input
                placeholder="Postal code"
                type="text"
                id="postalCode"
                value={vendors.postalCode}
                onChange={(e) => {
                  handleChange(e);
                  setVendors({ ...vendors, postalCode: e.target.value });
                }}
                onBlur={handleBlur}
                className={
                  errors.postalCode && touched.postalCode ? "input-error" : ""
                }
              ></input>
              {errors.postalCode && touched.postalCode && (
                <p className="error">{errors.postalCode}</p>
              )}
            </div>
            <div className="side2">
              <input
                placeholder="Country"
                type="text"
                id="country"
                value={vendors.country}
                onChange={(e) => {
                  handleChange(e);
                  setVendors({ ...vendors, country: e.target.value });
                }}
                onBlur={handleBlur}
                className={
                  errors.country && touched.country ? "input-error" : ""
                }
              ></input>
              {errors.country && touched.country && (
                <p className="error">{errors.country}</p>
              )}
            </div>
          </div>
          <div class="sidefields">
            <div className="side1">
              <input
                placeholder="Telephone 1"
                type="tel"
                id="telePhone1"
                value={vendors.telePhone1}
                onChange={(e) => {
                  handleChange(e);
                  setVendors({ ...vendors, telePhone1: e.target.value });
                }}
                onBlur={handleBlur}
                className={
                  errors.telePhone1 && touched.telePhone1 ? "input-error" : ""
                }
              ></input>
              {errors.telePhone1 && touched.telePhone1 && (
                <p className="error">{errors.telePhone1}</p>
              )}
            </div>
            <div className="side2">
              <input
                placeholder="Telephone 2"
                type="tel"
                id="telePhone2"
                name="telePhone2"
                value={vendors.telePhone2}
                onChange={(e) => {
                  setVendors({ ...vendors, telePhone2: e.target.value });
                }}
              ></input>
            </div>
          </div>
          <div class="sidefields">
            <div className="side1">
              <input
                placeholder="Email"
                type="email"
                id="vendorEmail"
                value={vendors.vendorEmail}
                onChange={(e) => {
                  handleChange(e);
                  setVendors({ ...vendors, vendorEmail: e.target.value });
                }}
                onBlur={handleBlur}
                className={
                  errors.vendorEmail && touched.vendorEmail ? "input-error" : ""
                }
              ></input>
              {errors.vendorEmail && touched.vendorEmail && (
                <p className="error">{errors.vendorEmail}</p>
              )}
            </div>
            <div className="side2">
              <input
                placeholder="Website Link"
                type="text"
                id="vendorWebsite"
                name="vendorWebsite"
                value={vendors.vendorWebsite}
                onChange={(e) => {
                  setVendors({ ...vendors, vendorWebsite: e.target.value });
                }}
              ></input>
            </div>
          </div>
          <div className="sidefield">
            <label className="pdlabel" for="productDetails">
              Product Details:
            </label>
            <div>
              <button
                className="removevendors"
                onClick={(e) => {
                  addInputField(e);
                }}
              >
                Add Products
              </button>
            </div>
          </div>
          <div>
            {productVendorDetails.map((data, index) => {
              let { productName, productDescription, price } = data;
              return (
                <div>
                  <div class="sidefield">
                    <div>
                      <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => {
                          handleChange(e);
                          setShowError(false);
                          let val = { ...data, productName: e.target.value };
                          let li = [...productVendorDetails];
                          li[index] = val;
                          setProductVendorDetails(li);
                        }}
                        onBlur={handleBlur}
                        placeholder="Product Name"
                        className={
                          errors.productName && touched.productName
                            ? "input-error"
                            : ""
                        }
                      />
                      {errors.productName && touched.productName && (
                        <p className="error">{errors.productName}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => {
                          handleChange(e);
                          setShowError(false);
                          let val = {
                            ...data,
                            productDescription: e.target.value,
                          };
                          let li = [...productVendorDetails];
                          li[index] = val;
                          setProductVendorDetails(li);
                        }}
                        onBlur={handleBlur}
                        placeholder="Product Description"
                        className={
                          errors.productDescription &&
                          touched.productDescription
                            ? "input-error"
                            : ""
                        }
                      />
                      {errors.productDescription &&
                        touched.productDescription && (
                          <p className="error">{errors.productDescription}</p>
                        )}
                    </div>
                    <div>
                      <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => {
                          handleChange(e);
                          setShowError(false);
                          let val = {
                            ...data,
                            price: e.target.value,
                          };
                          let li = [...productVendorDetails];
                          li[index] = val;
                          setProductVendorDetails(li);
                        }}
                        onBlur={handleBlur}
                        placeholder="Price"
                        className={
                          errors.price && touched.price ? "input-error" : ""
                        }
                      />
                      {errors.price && touched.price && (
                        <p className="error">{errors.price}</p>
                      )}
                    </div>
                    <div>
                      {productVendorDetails.length !== 1 ? (
                        <button
                          className="removevendors"
                          id={index}
                          onClick={(e) => {
                            removeInputFields(e, index);
                          }}
                        >
                          X
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {showError && (
            <p className="error">
              Atleast you should provide a product details
            </p>
          )}
          <button
            className="addvendors"
            onClick={(e) => {
              e.preventDefault();
              filter();
              updateVendor();
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditVendor;
