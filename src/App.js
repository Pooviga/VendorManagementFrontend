// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Sidebar from './component/Navbar';
// import { BrowserRouter } from 'react-router-dom'
import Login from './component/Login/Login';
import Navbar from './component/Navbar/Navbar';
import DataContext, { DataProvider } from './DataContext/DataContext';
import Viewvendors from './component/Viewvendors/Viewvendors';
import Addvendors from './component/Addvendors/Addvendors';
import { useContext } from 'react';


function App() {

  const { islogin, setIslogin } = useContext(DataContext);
  return (


    <div className="App"><DataProvider>
      {true ? <Navbar /> : <Login />}
      <div className='content-main'>
      {/* <Addvendors/>
      <Viewvendors/> */}
      </div>

      <Routes>
        {/* <Route exact path="/" element={<Login />}></Route> */}
        {/* <Route path="/home" element={<Navbar />}></Route> */}
        <Route path='/viewvendors' element={<Viewvendors />} />
        <Route path='/addvendor' element={<Addvendors />} />
      </Routes>
    </DataProvider>
    </div>
  );
}

export default App;
