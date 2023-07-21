import React, { useContext } from "react";
import { FaAlignRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../Viewvendors/Viewvendors.css";
import "../ViewPurchaseOrder/ViewPurchaseOrder.css";
import AddProductPurchaseDetails from "../AddProductPurchaseDetails/AddProductPurchaseDetails";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import DataContext, { DataProvider } from "../../DataContext/DataContext";
import { logDOM } from "@testing-library/react";
import axios from "axios";
import EditProductPurchaseDetails from "../EditProductPurchaseDetails/EditProductPurchaseDetails";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";

function ViewPurchaseOrder() {
  const userData = JSON.parse(localStorage.getItem("User"));
  const userid = userData.id;
  const role = userData.role.name.toLowerCase();
  const { id, setData, data } = useContext(DataContext);
  const [selectedStatus, setSelectedStatus] = useState("all");
  //   const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://localhost:7017/PurchaseOrder").then((response) => {
      console.log(response.data);
      let data = response.data;
      setData(data);
    });
  }, []);
  function getStatusColor(status) {
    switch (status.toLowerCase()) {
      case "pending":
        return "#FFFFCC"; // Yellow color for Pending status
      case "approved":
        return "#CCFFCC"; // Green color for Approved status
      case "declined":
        return "#FFCCCC"; // Red color for Declined status
      default:
        return "white"; // Default color for other statuses
    }
  }

  function deletePO(poid) {
    console.log(id);
    axios
      .delete("https://localhost:7017/PurchaseOrder/" + poid)
      .then((response) => {
        setData(data.filter((x) => x.purchaseOrderWithUsersName.id !== poid));
      });
  }

  const navigate = useNavigate("/");
  const filteredData =
    selectedStatus === "all"
      ? data
      : data.filter(
          (d) => d.purchaseOrderWithUsersName.status === selectedStatus
        );
  return (
    <div style={{ padding: 24, overflowX: "hidden" }}>
      <div className="topics">
        <h2 className="rh2">Purchased Product Details</h2>

        {role != "readonly" && (
          <Popup
            trigger={
              <button
                className="addpurchase"
                onClick={() => {
                  navigate("/addvendor");
                }}
              >
                Create Purchase Order
              </button>
            }
            modal
            nested
          >
            {(close) => (
              <div>
                <div>
                  <button
                    className="closepurchaseorder"
                    onClick={() => close()}
                  >
                    X
                  </button>
                </div>
                <div>
                  <AddProductPurchaseDetails close={close} />
                </div>
              </div>
            )}
          </Popup>
        )}

        {/* <button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button> */}
      </div>
      <div>
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Declined">Declined</option>
          {/* Add other status options if needed */}
        </select>
      </div>
      <div className="usedcolors">
        <div className="colors">
          <p>Pending</p>
          <h1 className="yellow"></h1>
        </div>
        <div className="colors">
          <p>Approved</p>
          <h1 className="green"></h1>
        </div>
        <div className="colors">
          <p>Declined</p>
          <h1 className="red"></h1>
        </div>
      </div>
      {/* div to view po details */}
      <div className="table_overflow">
        <table>
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Title</th>
              <th scope="col">Created by</th>
              <th scope="col">Vendor Name</th>
              <th scope="col">Approval Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{d.purchaseOrderWithUsersName.description}</td>
                  <td>{d.purchaseOrderWithUsersName.createdBy.name}</td>
                  <td>{d.vendorForPurchaseOrder.vendorName}</td>
                  <td
                    style={{
                      color: "black",
                      backgroundColor: getStatusColor(
                        d.purchaseOrderWithUsersName.status
                      ),
                    }}
                  >
                    {d.purchaseOrderWithUsersName.status}
                  </td>

                  <td>
                    <Popup
                      trigger={
                        <Tooltip title="View">
                          <Button type="button" class="btn-btn">
                            <i class="far fa-eye"></i>
                          </Button>
                        </Tooltip>
                      }
                      modal
                      nested
                    >
                      {(close) => (
                        <div
                          style={{
                            height: "450px",
                            overflowY: "scroll",
                            backgroundColor: "white",
                            padding: "40px",
                            border: "3px solid #091644",
                          }}
                        >
                          <div>
                            <button
                              className="vieworder"
                              style={{ float: "right" }}
                              onClick={() => close()}
                            >
                              x
                            </button>
                            <h4>{d.purchaseOrderWithUsersName.description}</h4>
                          </div>
                          <div className="viewpurchasedetail">
                            <p>
                              <p>
                                <b>Id :</b> {d.purchaseOrderWithUsersName.id}
                              </p>
                              <p>
                                <b>Created by :</b>{" "}
                                {d.purchaseOrderWithUsersName.createdBy.name}
                              </p>
                              <p>
                                <b>time of creation :</b>{" "}
                                {d.purchaseOrderWithUsersName.orderDateTime}
                              </p>
                              <p>
                                <b>status :</b>{" "}
                                {d.purchaseOrderWithUsersName.status}
                              </p>
                              <p>
                                <b>Tracking Number :</b>{" "}
                                {d.purchaseOrderWithUsersName.trackingNumber}
                              </p>
                              <p>
                                <b>Total amount of purchase :</b>{" "}
                                {d.purchaseOrderWithUsersName.total}
                              </p>
                              <p>
                                <b>Billing Address :</b>
                                {
                                  d.purchaseOrderWithUsersName
                                    .billingAddressCity
                                }
                                ,
                                {
                                  d.purchaseOrderWithUsersName
                                    .billingAddressCity
                                }
                                ,
                                {
                                  d.purchaseOrderWithUsersName
                                    .billingAddressState
                                }
                                ,
                                {
                                  d.purchaseOrderWithUsersName
                                    .billingAddressCountry
                                }
                                -
                                {
                                  d.purchaseOrderWithUsersName
                                    .billingAddressZipcode
                                }
                              </p>
                              <p>
                                <b>Shipping Address :</b>
                                {
                                  d.purchaseOrderWithUsersName
                                    .shippingAddressCity
                                }
                                ,
                                {
                                  d.purchaseOrderWithUsersName
                                    .shippingAddressCity
                                }
                                ,
                                {
                                  d.purchaseOrderWithUsersName
                                    .shippingAddressState
                                }
                                ,
                                {
                                  d.purchaseOrderWithUsersName
                                    .shippingAddressCountry
                                }
                                -
                                {
                                  d.purchaseOrderWithUsersName
                                    .shippingAddressZipcode
                                }
                              </p>
                              <table>
                                <thead>
                                  <th>Product Id</th>
                                  <th>Quantity</th>
                                  <th>Product Name</th>
                                  <th>Product Description</th>
                                  <th>Price</th>
                                </thead>
                                <tbody>
                                  {d.purchaseProducts.map((p, index) => {
                                    return (
                                      <tr>
                                        <td>{p.productId}</td>
                                        <td>{p.quantity}</td>
                                        <td>{p.productName}</td>
                                        <td>{p.productDescription}</td>
                                        <td>{p.price}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </p>
                          </div>
                        </div>
                      )}
                    </Popup>
                    {d.purchaseOrderWithUsersName.createdBy.id === userid && (
                      <>
                        <Popup
                          trigger={
                            <Tooltip title="Edit">
                              <Button type="button" class="btn-btn">
                                <i class="fas fa-edit"></i>
                              </Button>
                            </Tooltip>
                          }
                          modal
                          nested
                        >
                          {(close) => (
                            <div>
                              <div>
                                <button
                                  type="button"
                                  class="btn-btn"
                                  className="closeeditpurchaseorder"
                                  onClick={() => close()}
                                >
                                  X
                                </button>
                              </div>
                              <div className="productform">
                                <EditProductPurchaseDetails
                                  {...data[index]}
                                  close={close}
                                />
                              </div>
                            </div>
                          )}
                        </Popup>

                        {/* <button
                          // style={{ fontSize: "24px" }}
                          >
                            <i class="fas fa-edit"></i>
                          </button> */}
                        <Tooltip title="Delete">
                          <Button
                            // style={{ fontSize: "24px" }}
                            type="button"
                            class="btn-btn"
                            onClick={() =>
                              deletePO(d.purchaseOrderWithUsersName.id)
                            }
                          >
                            <i class="far fa-trash-alt"></i>
                          </Button>
                        </Tooltip>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ViewPurchaseOrder;
