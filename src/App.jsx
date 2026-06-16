import { BrowserRouter, Routes, Route } from "react-router-dom";

import VendorRequest from "./pages/vendor/VendorRequest";
import ApproveOrder from "./pages/supplier/ApproveOrder";
import Register from "./pages/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/vendor-request"
          element={<VendorRequest />}
        />

        <Route
          path="/approve-order"
          element={<ApproveOrder />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;