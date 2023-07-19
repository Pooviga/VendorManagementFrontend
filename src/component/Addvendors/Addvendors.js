import { React, useContext, useState } from "react";
import "../Addvendors/addvendors.css";
import axios from "axios";
import DataContext from "../../DataContext/DataContext";

function Addvendors(props) {
  const { navigate, postVendor } = useContext(DataContext);
  const [inputFields, setInputFields] = useState([
    {
      vendorId: "00000000-0000-0000-0000-000000000000",
      ProductName: "",
      ProductDescription: "",
      price: 0,
    },
  ]);
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

  const handleChange = (index, evnt) => {
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
        <div>
          <input type="hidden" id="vendorId"></input>
          <div class="sidefields">
            <input
              placeholder="Vendor Name"
              type="text"
              id="vendorName"
              name="vendorName"
              required
              onChange={(e) => {
                setNewVendor({ ...newVendor, vendorName: e.target.value });
              }}
            ></input>
            <input
              placeholder="Vendor Type"
              type="text"
              id="vendorType"
              name="vendorType"
              required
              onChange={(e) => {
                setNewVendor({ ...newVendor, vendorType: e.target.value });
              }}
            ></input>
          </div>
          <div class="sidefields">
            <input
              placeholder="Adress-Line 1"
              type="text"
              id="addressLine1"
              name="addressLine1"
              required
              onChange={(e) => {
                setNewVendor({ ...newVendor, addressLine1: e.target.value });
              }}
            ></input>
            <input
              placeholder="Adress-Line 2"
              type="text"
              id="addressLine2"
              name="addressLine2"
              onChange={(e) => {
                setNewVendor({ ...newVendor, addressLine2: e.target.value });
              }}
            ></input>
          </div>
          <div class="sidefields">
            <input
              placeholder="City"
              type="text"
              id="city"
              name="city"
              required
              onChange={(e) => {
                setNewVendor({ ...newVendor, city: e.target.value });
              }}
            ></input>
            <input
              placeholder="State"
              type="text"
              id="state"
              name="state"
              required
              onChange={(e) => {
                setNewVendor({ ...newVendor, state: e.target.value });
              }}
            ></input>
          </div>
          <div class="sidefields">
            <input
              placeholder="Postal code"
              type="text"
              id="postalCode"
              name="postalCode"
              required
              onChange={(e) => {
                setNewVendor({ ...newVendor, postalCode: e.target.value });
              }}
            ></input>
            <input
              placeholder="Country"
              type="text"
              id="country"
              name="country"
              required
              onChange={(e) => {
                setNewVendor({ ...newVendor, country: e.target.value });
              }}
            ></input>
          </div>
          <div class="sidefields">
            <input
              placeholder="Telephone 1"
              type="tel"
              id="telePhone1"
              name="telePhone1"
              required
              onChange={(e) => {
                setNewVendor({ ...newVendor, telePhone1: e.target.value });
              }}
            ></input>
            <input
              placeholder="Telephone 2"
              type="tel"
              id="telePhone2"
              name="telePhone2"
              onChange={(e) => {
                setNewVendor({ ...newVendor, telePhone2: e.target.value });
              }}
            ></input>
          </div>
          <div class="sidefields">
            <input
              placeholder="Email"
              type="email"
              id="vendorEmail"
              name="vendorEmail"
              required
              onChange={(e) => {
                setNewVendor({ ...newVendor, vendorEmail: e.target.value });
              }}
            ></input>
            <input
              placeholder="Website Link"
              type="text"
              id="vendorWebsite"
              name="vendorWebsite"
              onChange={(e) => {
                setNewVendor({ ...newVendor, vendorWebsite: e.target.value });
              }}
            ></input>
          </div>
          <div className="sidefield">
            <label className="pdlabel" for="productDetails">
              Product Details:
            </label>
            <div>
              <button className="removevendors" onClick={addInputField}>
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
                    <input
                      type="text"
                      onChange={(evnt) => handleChange(index, evnt)}
                      value={ProductName}
                      name="ProductName"
                      className="form-control"
                      placeholder="Product Name"
                    />
                    <input
                      type="email"
                      onChange={(evnt) => handleChange(index, evnt)}
                      value={ProductDescription}
                      name="ProductDescription"
                      className="form-control"
                      placeholder="Product Description"
                    />
                    <input
                      type="text"
                      onChange={(evnt) => handleChange(index, evnt)}
                      value={price}
                      name="price"
                      className="form-control"
                      placeholder="Price"
                    />
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
          <button
            className="addvendors"
            onClick={(e) => {
              e.preventDefault();
              filter();
              newVendor.productDetailsRequest = [...inputFields];
              console.log(newVendor);
              postVendor(newVendor, props.close());
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
