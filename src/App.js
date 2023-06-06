
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './components/login/Login'
import Customer from './components/customer/Customer';
import Admin from './components/admin/Admin';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/customer/:username" element={<Customer />} />
        <Route exact path="/admin/:username" element={<Admin />} />
      </Routes>
      {/* <login /> */}

    </>
  );
}

export default App;
