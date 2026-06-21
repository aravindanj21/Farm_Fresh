import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import VendorChat from "./pages/vendor/VendorChat";
import SupplierChat from "./pages/supplier/SupplierChat";

import "./styles/chat.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/vendor-chat"
          element={
            <VendorChat />
          }
        />

        <Route
          path="/supplier-chat"
          element={
            <SupplierChat />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;