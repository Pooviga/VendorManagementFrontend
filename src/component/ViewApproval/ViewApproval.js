import React, { useState, useEffect, useContext } from "react";
import ViewApprovalCard from "../ViewApprovalCard/ViewApprovalCard";
import axios from "axios";
import "./ViewApproval.css";
import ViewPurchaseTable from "../ViewPurchaseTable/ViewPurchaseTable";
import DataContext from "../../DataContext/DataContext";

const ViewApproval = () => {
  // const [data, setData] = useState([]);
  const { allData, setAllData } = useContext(DataContext);

  console.log(allData);

  return (
    <div style={{ padding: 24, overflowX: "hidden" }} className="container">
      <h2>Pending Approval</h2>
      <table>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Order Placed By</th>
            <th>Ordered On</th>
            <th>Total Amount</th>
            <th>Vendor Name</th>
            <th>Action</th>
          </tr>
        </thead>

        {allData.map((d) => {
          console.log(allData);
          return <ViewPurchaseTable key={d.id} data={d} />;
        })}
      </table>
    </div>
  );
};

export default ViewApproval;
