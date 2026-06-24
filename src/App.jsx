import {
  Routes,
  Route
} from "react-router-dom";

import SupplierVerification from "./Pages/SupplierVerification";
import SupplierDashboard from "./pages/SupplierDashboard";
import SupplierRegister from "./Pages/SupplierRegister";
import Login from "./Pages/vendorverification/Login";


import AdminSupplierVerification
  from "./pages/AdminSupplierVerification";

import AddProduct from "./Pages/AddProduct";
import SupplierOrders from "./Pages/SupplierOrders";

function App() {
  return (
    <Routes>
      <Route
       path="/supplier-verification"
       element={<SupplierVerification />}
       />      

      <Route
      path="/supplier-dashboard"
      element={<SupplierDashboard />}
      />

      <Route
     path="/admin/supplier-verifications"
     element={<AdminSupplierVerification />}
     />

     <Route
     path="/supplier-register"
     element={<SupplierRegister />}
    />

    <Route
    path="/login"
    element={<Login />}
    />

     <Route
    path="/add-product"
    element={<AddProduct />}
  />

    <Route
    path="/supplier-orders"
    element={<SupplierOrders />}
  />


      
    </Routes>
   
  );
}

export default App;