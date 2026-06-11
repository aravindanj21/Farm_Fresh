import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Suppliers from "./admin/Suppliers";
import Vendors from "./admin/Vendors";
import Products from "./admin/Products";
import Orders from "./admin/Orders";
import Invoices from "./admin/Invoices";

import StockList from "./supplier/StockList";
import VendorRequests from "./supplier/VendorRequests";

import BrowseProducts from "./vendor/BrowseProducts";
import MyOrders from "./vendor/MyOrders";

const AppRoutes = () => {
  return (
    <Routes>

     
      <Route
        path="/"
        element={<Navigate to="/admin/suppliers" />}
      />

     
      <Route
        path="/admin/suppliers"
        element={<Suppliers />}
      />

      <Route
        path="/admin/vendors"
        element={<Vendors />}
      />

      <Route
        path="/admin/products"
        element={<Products />}
      />

      <Route
        path="/admin/orders"
        element={<Orders />}
      />

      <Route
        path="/admin/invoices"
        element={<Invoices />}
      />

      
      <Route
        path="/supplier/stock-list"
        element={<StockList />}
      />

      <Route
        path="/supplier/vendor-requests"
        element={<VendorRequests />}
      />

     
      <Route
        path="/vendor/browse-products"
        element={<BrowseProducts />}
      />

      <Route
        path="/vendor/my-orders"
        element={<MyOrders />}
      />

      
      <Route
        path="*"
        element={
          <h2 style={{ padding: "20px" }}>
            Page Not Found
          </h2>
        }
      />
    </Routes>
  );
};

export default AppRoutes;