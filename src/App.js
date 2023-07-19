// import logo from './logo.svg';
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
// import Sidebar from './component/Navbar';
// import { BrowserRouter } from 'react-router-dom'
import Login from "./component/Login/Login";
import Navbar from "./component/Navbar/Navbar";
import DataContext, { DataProvider } from "./DataContext/DataContext";
import Viewvendors from "./component/Viewvendors/Viewvendors";
import { useContext, useEffect, useState } from "react";
import Dashboard from "./component/Dashboard/Dashboard";
import Addvendors from "./component/Addvendors/Addvendors";
import Home from "./component/Home/Home";
import PurchaseOrder from "./component/ViewPurchaseOrder/ViewPurchaseOrder";
import ViewApproval from "./component/ViewApproval/ViewApproval";
import ViewUsers from "./component/ViewUsers/ViewUsers";
import EditVendors from "./component/EditVendor/EditVendor";
import Profile from "./component/Profile/Profile";
import ViewPurchaseTable from "./component/ViewPurchaseTable/ViewPurchaseTable";

// import PurchaseOrder from './component/PurchaseOrder/PurchaseOrder';

function App() {
  const navigate = useNavigate();
  const [islogin, setIslogin] = useState(false);
  const user = JSON.parse(localStorage.getItem("User"));
  const [role, setRole] = useState("");
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("User"));
    if (user) {
      setIslogin(true);
      setRole(user?.role?.name.toLowerCase());
    } else {
      setIslogin(false);
      navigate("/");
    }
  }, []);
  return (
    <DataProvider>
      <div className="App">
        {/* <Home value={(islogin, setIslogin)} /> */}
        {(user !== null || islogin) && (
          <Navbar role={user.role.name.toLowerCase()} />
        )}
        <Routes>
          {!islogin && <Route path="/" exact element={<Login />} />}
          {user !== null && (
            <>
              <Route path="/navbar" element={<Navbar />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/viewusers" element={<ViewUsers />} />
              <Route path="/viewvendors" element={<Viewvendors />} />
              <Route path="/purchaseorders" element={<PurchaseOrder />} />
              <Route path="/viewapproval" element={<ViewApproval />} />
              <Route path="/editvendor" element={<EditVendors />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/viewpurchasetable"
                element={<ViewPurchaseTable />}
              />
              {/* <Route path="/purchaseorder" element={<PurchaseOrder />} /> */}
            </>
          )}
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
