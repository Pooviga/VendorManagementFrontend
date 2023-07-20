import React, { useContext } from "react";
import { FaAlignRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../Viewvendors/Viewvendors.css";
import AddProductPurchaseDetails from "../AddProductPurchaseDetails/AddProductPurchaseDetails";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import DataContext, { DataProvider } from "../../DataContext/DataContext";
import { logDOM } from "@testing-library/react";
import axios from "axios";
import EditProductPurchaseDetails from "../EditProductPurchaseDetails/EditProductPurchaseDetails";

function ViewPurchaseOrder() {
  const userData = JSON.parse(localStorage.getItem("User"));
  const userid = userData.id;
  console.log(userid);
  const { role, id, setData, data } = useContext(DataContext);
  //   const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://localhost:7017/PurchaseOrder").then((response) => {
      console.log(response.data);
      let data = response.data;
      setData(data);
    });
  }, []);

  function deletePO(poid) {
    console.log(id);
    axios
      .delete("https://localhost:7017/PurchaseOrder/" + poid)
      .then((response) => {
        setData(data.filter((x) => x.purchaseOrderWithUsersName.id !== poid));
      });
  }

  const navigate = useNavigate("/");
  return (
    <div style={{ padding: 24, overflowX: "hidden" }}>
      <div className="topics">
        <h2 className="rh2">Purchased Product Details</h2>
        <Popup
          trigger={
            <button
              className="add_button"
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
                <button className="close" onClick={() => close()}>
                  X
                </button>
              </div>
              <div>
                <AddProductPurchaseDetails close={close} />
              </div>
            </div>
          )}
        </Popup>
        {/* <button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button> */}
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
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{d.purchaseOrderWithUsersName.description}</td>
                  <td>{d.purchaseOrderWithUsersName.createdBy.name}</td>
                  <td>{d.vendorForPurchaseOrder.vendorName}</td>

                  <td>
                    <Popup
                      trigger={
                        <button type="button" class="btn-btn">
                          <i class="far fa-eye"></i>
                        </button>
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
                          }}
                        >
                          <div>
                            <button
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
                            <button type="button" class="btn-btn">
                              <i class="fas fa-edit"></i>
                            </button>
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
                                  className="close"
                                  onClick={() => close()}
                                >
                                  X
                                </button>
                              </div>
                              <div className="productform">
                                <EditProductPurchaseDetails {...data[index]} />
                              </div>
                            </div>
                          )}
                        </Popup>

                        {/* <button
                          // style={{ fontSize: "24px" }}
                          >
                            <i class="fas fa-edit"></i>
                          </button> */}
                        <button
                          // style={{ fontSize: "24px" }}
                          type="button"
                          class="btn-btn"
                          onClick={() =>
                            deletePO(d.purchaseOrderWithUsersName.id)
                          }
                        >
                          <i class="far fa-trash-alt"></i>
                        </button>
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
// import React, { useContext } from "react";
// import { FaAlignRight } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import "../Viewvendors/Viewvendors.css";
// import AddProductPurchaseDetails from "../AddProductPurchaseDetails/AddProductPurchaseDetails";
// import "reactjs-popup/dist/index.css";
// import Popup from "reactjs-popup";
// import { useEffect, useState } from "react";
// import DataContext, { DataProvider } from "../../DataContext/DataContext";
// import { logDOM } from "@testing-library/react";
// import axios from "axios";
// import EditProductPurchaseDetails from "../EditProductPurchaseDetails/EditProductPurchaseDetails";

// function ViewPurchaseOrder() {
//   const userData = JSON.parse(localStorage.getItem("User"));
//   const userid = userData.id;
//   console.log(userid);
//   const { role, id, setData, data } = useContext(DataContext);
//   //   const [data, setData] = useState([]);
//   useEffect(() => {
//     axios.get("https://localhost:7017/PurchaseOrder").then((response) => {
//       console.log(response.data);
//       let data = response.data;
//       setData(data);
//     });
//   }, []);

//   function deletePO(poid) {
//     console.log(id);
//     axios
//       .delete("https://localhost:7017/PurchaseOrder/" + poid)
//       .then((response) => {
//         setData(data.filter((x) => x.purchaseOrderWithUsersName.id !== poid));
//       });
//   }

//   const navigate = useNavigate("/");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredData, setFilteredData] = useState(data); // Initially, filteredData is the same as the data

//   // Function to handle search input changes
//   const handleSearchInputChange = (e) => {
//     setSearchQuery(e.target.value);
//     filterData(e.target.value); // Call filterData() to update the filteredData based on the search query
//   };

//   // Function to filter the data based on the search query
//   const filterData = (query) => {
//     const lowercasedQuery = query.toLowerCase();
//     const filtered = data.filter(
//       (d) =>
//         d.purchaseOrderWithUsersName.description
//           .toLowerCase()
//           .includes(lowercasedQuery) ||
//         d.purchaseOrderWithUsersName.createdBy.name
//           .toLowerCase()
//           .includes(lowercasedQuery) ||
//         d.vendorForPurchaseOrder.vendorName
//           .toLowerCase()
//           .includes(lowercasedQuery)
//       // Add more conditions for other fields you want to search by
//     );
//     setFilteredData(filtered);
//   };
//   return (
//     <div style={{ padding: 24 }}>
//       <div className="topics">
//         <h2 className="rh2">Purchased Product Details</h2>
//         <Popup
//           trigger={
//             <button
//               className="add_button"
//               onClick={() => {
//                 navigate("/addvendor");
//               }}
//             >
//               Create Purchase Order
//             </button>
//           }
//           modal
//           nested
//         >
//           {(close) => (
//             <div>
//               <div>
//                 <button className="close" onClick={() => close()}>
//                   X
//                 </button>
//               </div>
//               <div>
//                 <AddProductPurchaseDetails close={close} />
//               </div>
//             </div>
//           )}
//         </Popup>
//         {/* <button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button> */}
//       </div>
//       {/* div to view po details */}
//       <input
//         type="text"
//         placeholder="Search by title, created by, or vendor name..."
//         value={searchQuery}
//         onChange={handleSearchInputChange}
//       />

//       <div className="table_overflow">
//         <br></br>
//         <table>
//           <thead>
//             <tr>
//               <th scope="col">S.No</th>
//               <th scope="col">Title</th>
//               <th scope="col">Created by</th>
//               <th scope="col">Vendor Name</th>
//               <th scope="col">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((d, index) => {
//               return (
//                 <tr>
//                   <td>{index + 1}</td>
//                   <td>{d.purchaseOrderWithUsersName.description}</td>
//                   <td>{d.purchaseOrderWithUsersName.createdBy.name}</td>
//                   <td>{d.vendorForPurchaseOrder.vendorName}</td>
//                   <td>
//                     <td>
//                       <Popup
//                         trigger={
//                           <button>
//                             <i class="far fa-eye"></i>
//                           </button>
//                         }
//                         modal
//                         nested
//                       >
//                         {(close) => (
//                           <div>
//                             <div>
//                               <button
//                                 style={{ float: "right" }}
//                                 onClick={() => close()}
//                               >
//                                 x
//                               </button>
//                               <h4>
//                                 {d.purchaseOrderWithUsersName.description}
//                               </h4>
//                             </div>
//                             <div className="viewpurchasedetail">
//                               <p>
//                                 <p>
//                                   <b>Id :</b> {d.purchaseOrderWithUsersName.id}
//                                 </p>
//                                 <p>
//                                   <b>Created by :</b>{" "}
//                                   {d.purchaseOrderWithUsersName.createdBy.name}
//                                 </p>
//                                 <p>
//                                   <b>time of creation :</b>{" "}
//                                   {d.purchaseOrderWithUsersName.orderDateTime}
//                                 </p>
//                                 <p>
//                                   <b>status :</b>{" "}
//                                   {d.purchaseOrderWithUsersName.status}
//                                 </p>
//                                 <p>
//                                   <b>Tracking Number :</b>{" "}
//                                   {d.purchaseOrderWithUsersName.trackingNumber}
//                                 </p>
//                                 <p>
//                                   <b>Total amount of purchase :</b>{" "}
//                                   {d.purchaseOrderWithUsersName.total}
//                                 </p>
//                                 <p>
//                                   <b>Billing Address :</b>
//                                   {
//                                     d.purchaseOrderWithUsersName
//                                       .billingAddressCity
//                                   }
//                                   ,
//                                   {
//                                     d.purchaseOrderWithUsersName
//                                       .billingAddressCity
//                                   }
//                                   ,
//                                   {
//                                     d.purchaseOrderWithUsersName
//                                       .billingAddressState
//                                   }
//                                   ,
//                                   {
//                                     d.purchaseOrderWithUsersName
//                                       .billingAddressCountry
//                                   }
//                                   -
//                                   {
//                                     d.purchaseOrderWithUsersName
//                                       .billingAddressZipcode
//                                   }
//                                 </p>
//                                 <p>
//                                   <b>Shipping Address :</b>
//                                   {
//                                     d.purchaseOrderWithUsersName
//                                       .shippingAddressCity
//                                   }
//                                   ,
//                                   {
//                                     d.purchaseOrderWithUsersName
//                                       .shippingAddressCity
//                                   }
//                                   ,
//                                   {
//                                     d.purchaseOrderWithUsersName
//                                       .shippingAddressState
//                                   }
//                                   ,
//                                   {
//                                     d.purchaseOrderWithUsersName
//                                       .shippingAddressCountry
//                                   }
//                                   -
//                                   {
//                                     d.purchaseOrderWithUsersName
//                                       .shippingAddressZipcode
//                                   }
//                                 </p>
//                                 <table>
//                                   <thead>
//                                     <th>Product Id</th>
//                                     <th>Quantity</th>
//                                     <th>Product Name</th>
//                                     <th>Product Description</th>
//                                     <th>Price</th>
//                                   </thead>
//                                   <tbody>
//                                     {d.purchaseProducts.map((p, index) => {
//                                       return (
//                                         <tr>
//                                           <td>{p.productId}</td>
//                                           <td>{p.quantity}</td>
//                                           <td>{p.productName}</td>
//                                           <td>{p.productDescription}</td>
//                                           <td>{p.price}</td>
//                                         </tr>
//                                       );
//                                     })}
//                                   </tbody>
//                                 </table>
//                               </p>
//                             </div>
//                           </div>
//                         )}
//                       </Popup>
//                       {d.purchaseOrderWithUsersName.createdBy.id === userid && (
//                         <>
//                           <Popup
//                             trigger={
//                               <button type="button">
//                                 <i class="fas fa-edit"></i>
//                               </button>
//                             }
//                             modal
//                             nested
//                           >
//                             {(close) => (
//                               <div>
//                                 <div>
//                                   <button
//                                     className="close"
//                                     onClick={() => close()}
//                                   >
//                                     X
//                                   </button>
//                                 </div>
//                                 <div className="productform">
//                                   <EditProductPurchaseDetails
//                                     {...data[index]}
//                                   />
//                                 </div>
//                               </div>
//                             )}
//                           </Popup>

//                           {/* <button
//                           // style={{ fontSize: "24px" }}
//                           >
//                             <i class="fas fa-edit"></i>
//                           </button> */}
//                           <button
//                             // style={{ fontSize: "24px" }}

//                             onClick={() =>
//                               deletePO(d.purchaseOrderWithUsersName.id)
//                             }
//                           >
//                             <i class="far fa-trash-alt"></i>
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// export default ViewPurchaseOrder;
