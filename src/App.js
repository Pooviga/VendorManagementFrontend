import logo from './logo.svg';
import './App.css';
import Sidebar from './component/Navbar';
import Navbar from './component/Navbar';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
