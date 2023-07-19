import { React, useContext, useEffect, useState } from "react";
import "../Addvendors/addvendors.css";
import DataContext from "../../DataContext/DataContext";
import axios from "axios";

function EditVendor(props) {
  const [vendors, setVendors] = useState({ ...props.vendorDetails });
  const [productDetails, setProductDetails] = useState(props.productDetails);
  useEffect(() => {
    // setDetails(detail);
    // console.log(details);
  }, []);
  console.log("prodd", productDetails);

  const { navigate, postVendor } = useContext(DataContext);
  const [inputFields, setInputFields] = useState([
    {
      vendorId: "00000000-0000-0000-0000-000000000000",
      ProductName: "",
      ProductDescription: "",
      price: 0,
    },
  ]);

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
      productDetailsRequest: [...productDetails],
    };

    console.log("vendorss", vendorDetail);
    axios
      .put(
        `https://localhost:7017/api/VendorDetails/${vendors.id}`,
        vendorDetail
      )
      .then((response) => {
        console.log(response);
      });
  };

  const addInputField = (e) => {
    e.preventDefault();
    setProductDetails([
      ...productDetails,
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
    const rows = [...productDetails];
    rows.splice(index, 1);
    setProductDetails(rows);
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
    for (let i = 0; i < productDetails.length; i++) {
      productDetails[i].price = Number(productDetails[i].price);
      delete productDetails[i].vendorDetails;
      delete productDetails[i]?.vendorId;
    }
  }
  return (
    <div>
      <form>
        <div className="top">
          <h1>Edit Vendor</h1>
        </div>
        <div className="formdetails">
          <input type="hidden" id="vendorId"></input>
          <div class="sidefields">
            <input
              placeholder="Vendor Name"
              type="text"
              value={vendors.vendorName}
              onChange={(e) => {
                setVendors({ ...vendors, vendorName: e.target.value });
              }}
            ></input>
            <input
              placeholder="Vendor Type"
              type="text"
              id="vendorType"
              name="vendorType"
              value={vendors.vendorType}
              onChange={(e) => {
                setVendors({ ...vendors, vendorType: e.target.value });
              }}
            ></input>
          </div>
          <div class="sidefields">
            <input
              placeholder="Adress-Line 1"
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={vendors.addressLine1}
              onChange={(e) => {
                setVendors({ ...vendors, addressLine1: e.target.value });
              }}
            ></input>
            <input
              placeholder="Adress-Line 2"
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={vendors.addressLine2}
              onChange={(e) => {
                setVendors({ ...vendors, addressLine2: e.target.value });
              }}
            ></input>
          </div>
          <div class="sidefields">
            <input
              placeholder="City"
              type="text"
              id="city"
              name="city"
              value={vendors.city}
              onChange={(e) => {
                setVendors({ ...vendors, city: e.target.value });
              }}
            ></input>
            <input
              placeholder="State"
              type="text"
              id="state"
              name="state"
              value={vendors.state}
              onChange={(e) => {
                setVendors({ ...vendors, state: e.target.value });
              }}
            ></input>
          </div>
          <div class="sidefields">
            <input
              placeholder="Postal code"
              type="text"
              id="postalCode"
              name="postalCode"
              value={vendors.postalCode}
              onChange={(e) => {
                setVendors({ ...vendors, postalCode: e.target.value });
              }}
            ></input>
            <input
              placeholder="Country"
              type="text"
              id="country"
              name="country"
              value={vendors.country}
              onChange={(e) => {
                setVendors({ ...vendors, country: e.target.value });
              }}
            ></input>
          </div>
          <div class="sidefields">
            <input
              placeholder="Telephone 1"
              type="tel"
              id="telePhone1"
              name="telePhone1"
              value={vendors.telePhone1}
              onChange={(e) => {
                setVendors({ ...vendors, telePhone1: e.target.value });
              }}
            ></input>
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
          <div class="sidefields">
            <input
              placeholder="Email"
              type="email"
              id="vendorEmail"
              name="vendorEmail"
              value={vendors.vendorEmail}
              onChange={(e) => {
                setVendors({ ...vendors, vendorEmail: e.target.value });
              }}
            ></input>
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
            {productDetails.map((data, index) => {
              let { productName, productDescription, price } = data;
              return (
                <div>
                  <div class="sidefield">
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => {
                        let val = { ...data, productName: e.target.value };
                        let li = [...productDetails];
                        li[index] = val;
                        setProductDetails(li);
                      }}
                      className="form-control"
                      placeholder="Product Name"
                    />
                    <input
                      type="text"
                      value={productDescription}
                      onChange={(e) => {
                        let val = {
                          ...data,
                          productDescription: e.target.value,
                        };
                        let li = [...productDetails];
                        li[index] = val;
                        setProductDetails(li);
                      }}
                      name="ProductDescription"
                      className="form-control"
                      placeholder="Product Description"
                    />
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => {
                        let val = {
                          ...data,
                          price: e.target.value,
                        };
                        let li = [...productDetails];
                        li[index] = val;
                        setProductDetails(li);
                      }}
                      className="form-control"
                      placeholder="Price"
                    />
                    <div>
                      {productDetails.length !== 1 ? (
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

          <button
            className="addvendors"
            onClick={(e) => {
              e.preventDefault();
              filter();
              console.log("vendorDetails", vendors);
              console.log("products", productDetails);
              updateVendor();
              //   postVendor(newVendor);
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
