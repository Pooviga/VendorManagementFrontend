import { React, useContext, useState } from "react";
import "../Addvendors/addvendors.css";
import DataContext from "../../DataContext/DataContext";
import { useFormik } from "formik";
import { addVendorSchema } from "../../schemas";

function Addvendors() {
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

  const addVendor = () => {
    setNewVendor({ ...newVendor, ...values });
    if (
      inputFields.length === 1 &&
      (!inputFields[0].ProductName ||
        !inputFields[0].ProductDescription ||
        inputFields[0].price <= 0)
    ) {
      setShowError(true);
    } else {
      let values = [];
      inputFields.forEach((val) => {
        if (val.ProductName && val.ProductDescription && val.price > 0) {
          values.push(val);
        }
      });
      if (values.length > 0) {
        setShowError(false);
        setInputFields(values);
        newVendor.productDetailsRequest = [...inputFields];
        console.log("newvvv", newVendor);
        postVendor(newVendor);
      } else {
        setShowError(true);
      }
    }
  };
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
  const addInputField = (e) => {
    e.preventDefault();
    setInputFields([
      ...inputFields,
      {
        vendorId: "00000000-0000-0000-0000-000000000000",
        ProductName: "",
        ProductDescription: "",
        price: 0,
      },
    ]);
  };
  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };
  const handleChange1 = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
    console.log(...list);
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
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].price = parseInt(inputFields[i].price);
    }
  }
  return (
    <div>
      <form>
        <div className="top">
          <h1>Add Vendor</h1>
        </div>
        <div className="formdetails">
          <input type="hidden" id="vendorId"></input>
          <div class="sidefields">
            <div className="side1">
              <input
                placeholder="Vendor Name"
                type="text"
                id="vendorName"
                value={values.vendorName}
                onChange={handleChange}
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
                value={values.vendorType}
                onChange={handleChange}
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
            <div div className="side1">
              <input
                placeholder="Address-Line 1"
                type="text"
                id="addressLine1"
                value={values.addressLine1}
                onChange={handleChange}
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
            <div div className="side2">
              <input
                placeholder="Address-Line 2"
                type="text"
                id="addressLine2"
                value={values.addressLine2}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </div>
          </div>
          <div class="sidefields">
            <div div className="side1">
              <input
                placeholder="City"
                type="text"
                id="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.city && touched.city ? "input-error" : ""}
              ></input>
              {errors.city && touched.city && (
                <p className="error">{errors.city}</p>
              )}
            </div>
            <div div className="side2">
              <input
                placeholder="State"
                type="text"
                id="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.state && touched.state ? "input-error" : ""}
              ></input>
              {errors.state && touched.state && (
                <p className="error">{errors.state}</p>
              )}
            </div>
          </div>
          <div class="sidefields">
            <div className="side1" style={{ width: "50%" }}>
              <input
                placeholder="Postal code"
                type="text"
                id="postalCode"
                value={values.postalCode}
                onChange={handleChange}
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
                value={values.country}
                onChange={handleChange}
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
                value={values.telePhone1}
                onChange={handleChange}
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
                value={values.telePhone2}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
            </div>
          </div>
          <div class="sidefields">
            <div className="side1">
              <input
                placeholder="Email"
                type="email"
                id="vendorEmail"
                value={values.vendorEmail}
                onChange={handleChange}
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
                value={values.vendorWebsite}
                onChange={handleChange}
                onBlur={handleBlur}
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
                  handleSubmit(e);
                }}
              >
                Add Products
              </button>
            </div>
          </div>
          <div>
            {inputFields.map((data, index) => {
              const { ProductName, ProductDescription, price } = data;
              return (
                <div>
                  <div class="sidefield">
                    <div>
                      <input
                        type="text"
                        placeholder="Product Name"
                        value={ProductName}
                        id="productName"
                        onChange={(evnt) => {
                          handleChange(evnt);
                          let val = { ...data, ProductName: evnt.target.value };
                          let li = [...inputFields];
                          li[index] = val;
                          setInputFields(li);
                          //   handleChange1(index, evnt);
                        }}
                        onBlur={handleBlur}
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
                        placeholder="Product Description"
                        value={ProductDescription}
                        id="productDescription"
                        onChange={(evnt) => {
                          handleChange(evnt);
                          let val = {
                            ...data,
                            ProductDescription: evnt.target.value,
                          };
                          let li = [...inputFields];
                          li[index] = val;
                          setInputFields(li);
                        }}
                        onBlur={handleBlur}
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
                        type="text"
                        placeholder="Price"
                        value={price}
                        id="price"
                        onChange={(evnt) => {
                          handleChange(evnt);
                          let val = {
                            ...data,
                            price: evnt.target.value,
                          };
                          let li = [...inputFields];
                          li[index] = val;
                          setInputFields(li);
                        }}
                        onBlur={handleBlur}
                        className={
                          errors.price && touched.price ? "input-error" : ""
                        }
                      />
                      {errors.price && touched.price && (
                        <p className="error">{errors.price}</p>
                      )}
                    </div>
                    <div>
                      {inputFields.length !== 1 ? (
                        <button
                          className="removevendors"
                          id={index}
                          onClick={(e) => {
                            removeInputFields(e.target.id);
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
              handleSubmit(e);
              filter();
              newVendor.productDetailsRequest = [...inputFields];
              addVendor();
            }}
          >
            Add Vendors
          </button>
        </div>
      </form>
    </div>
  );
}
export default Addvendors;
