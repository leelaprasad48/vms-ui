import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import HomePage from './components/pages/HomePage';
import UploadDetailsPage from './components/pages/UploadDetailsPage';
import SuperAdminPage from './components/pages/SuperAdminPage';
import VendorLogin from './components/pages/VendorLogin';
import AdminHome from './components/pages/AdminHome';
import VendorHome from './components/pages/VendorHome';
import AdminPayment from './components/pages/AdminPayment';
import AddVendor from './components/pages/AddVendor';
import BasicDetails from './components/pages/BasicDetails';
import UpdateVendor from './components/pages/UpdateVendor';
import FileUpload from './components/pages/FileUpload';

//bhavesh 
function App() {
  return (
    <div className="App">
      <Router>
      <div className="page">
        <Route path="/" exact component={HomePage} />
        <Route path="/upload/" component={UploadDetailsPage} />
        <Route path="/superadmin/" component={SuperAdminPage} />
        <Route path="/VendorLogin/" component={VendorLogin} />
        <Route path="/AdminHome/" component={AdminHome} />
        <Route path="/VendorHome/" component={VendorHome} />
        <Route path="/AdminPayment/" component={AdminPayment} />
        <Route path="/addvendor/" component={AddVendor} />
        <Route path="/basicdetails/" component={BasicDetails} />
        <Route path="/UpdateVendor/" component={UpdateVendor} />
        <Route path="/FileUpload/" component={FileUpload} />
      </div>
    </Router>
    </div>
  );
}

export default App;
