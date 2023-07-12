// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Sidebar from './component/Navbar';
// import { BrowserRouter } from 'react-router-dom'
import Login from './component/Login/Login';
import Navbar from './component/Navbar/Navbar';
import { DataProvider } from './DataContext/DataContext';

function App() {
  return (
    <div className="App"><DataProvider>
      {/* <Navbar /> */}
      {/* <Login /> */}
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/home" element={<Navbar />}></Route>

      </Routes>
    </DataProvider>
    </div>
  );
}

export default App;
