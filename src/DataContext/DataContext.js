import axios from "axios";

import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [current, setCurrent] = useState(0);

  const [destination, setDestination] = useState(0);

  const [islogin, setIslogin] = useState(false);

  const [username, setUsername] = useState("");

  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  const [vendorDetails, setVendorDetails] = useState([]);

  const [productDetails, setProductDetails] = useState([]);
  const [id, setId] = useState(0);
  const [mail, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [name, setUser] = useState("");

  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);

  const [vendorData, setvendorData] = useState([]);
  var vdata = [];
  var pdata = [];
  useEffect(() => {
    axios
      .get("https://localhost:7017/PurchaseOrder")
      .then((res) =>
        setAllData(
          res.data.filter(
            (e) => e.purchaseOrderWithUsersName.status === "Pending"
          )
        )
      );
    console.log(allData);
  }, []);

  function postPurchaseOrder(prop, closing) {
    console.log(prop);

    axios.post("https://localhost:7017/PurchaseOrder", prop).then((res) => {
      axios.get("https://localhost:7017/PurchaseOrder").then((r) => {
        console.log(r.data);
        let data = r.data;
        setData(data);
      });
      alert("Your purchase order placed successfully");
      closing.close();
    });
  }

  const [details, setDetails] = useState([]);

  //   function refresh() {
  //     axios
  //       .get("https://localhost:7017/api/VendorDetails")
  //       .then((response) => {
  //         setDetails(response.data);
  //         response.data.map((newdata) => {
  //           console.log(newdata);

  //           pdata.push(newdata.productDetails);
  //           //   setProductDetails(newdata.productDetails);

  //           console.log(pdata);
  //         });
  //         setVendorDetails(response.data.vendorDetails);
  //         setProductDetails(pdata);
  //         // setVendorDetails(vdata);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching vendor details:", error);
  //       });
  //   }

  //   function postVendor(dataSet, close) {
  //     axios
  //       .post("https://localhost:7017/api/VendorDetails", dataSet)
  //       .then((ress) => {
  //         // alert("Vendor details are added successfully ✔");
  //         refresh();
  //         close.close();
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }

  function postVendor(dataSet, close) {
    axios
      .post("https://localhost:7017/api/VendorDetails", dataSet)
      .then((ress) => {
        //   navigate("/viewvendors");

        axios
          .get("https://localhost:7017/api/VendorDetails")
          .then((response) => {
            setDetails(response.data);
            response.data.map((newdata) => {
              vdata.push(newdata.vendorDetails);
              setVendorDetails(vdata);
              pdata.push(newdata.productDetails);
              setProductDetails(pdata);
            });

            console.log("asigned", vdata);
            console.log("asigned", pdata);

            // console.log('here:',response.data.vendorDetails);
            // setVendorDetails(response.data.vendorDetails)
          });
        alert("Vendor details are added successfully ✔");
        close.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <DataContext.Provider
      value={{
        current,
        setCurrent,

        destination,
        setDestination,

        islogin,
        setIslogin,

        username,
        setUsername,

        postVendor,
        data,
        setData,
        role,
        setRole,
        id,
        setId,
        mail,
        setEmail,
        name,
        setUser,
        phonenumber,
        setPhoneNumber,
        productDetails,
        setProductDetails,

        vendorDetails,
        setVendorDetails,
        allData,
        setAllData,
        postPurchaseOrder,

        navigate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
