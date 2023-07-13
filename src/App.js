// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Sidebar from './component/Navbar';
// import { BrowserRouter } from 'react-router-dom'
import Login from './component/Login/Login';
import Navbar from './component/Navbar/Navbar';
import DataContext, { DataProvider } from './DataContext/DataContext';
import Viewvendors from './component/Viewvendors/Viewvendors';
import { useContext } from 'react';
import Dashboard from './component/Dashboard/Dashboard';
import Addvendors from './component/Addvendors/Addvendors';


function App() {

  const { islogin, setIslogin } = useContext(DataContext);
  return (
    <DataProvider>

      <div className="App">
        <Navbar />
        {/* <Addvendors /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/addvendor" element={<Addvendors />} />
          <Route path="/viewvendors" element={<Viewvendors />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </DataProvider>

  );
}

export default App;
