import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import CustomerHome from "./farm-fresh/pages/customer/CustomerHome";
import CustomerRegister from "./farm-fresh/pages/customer/CustomerRegister";
import CustomerLogin from "./farm-fresh/pages/customer/CustomerLogin";
import OTPLogin from "./farm-fresh/pages/customer/OTPLogin";
import ForgotPassword from "./farm-fresh/pages/customer/ForgotPassword";
import ResetPassword from "./farm-fresh/pages/customer/ResetPassword";
import CustomerDashboard from "./farm-fresh/pages/customer/CustomerDashboar";
import CustomerProtectedRoute from "./farm-fresh/pages/customer/CustomerProtectedRoute";
import CategoryProducts from "./farm-fresh/pages/customer/CategoryProducts";
import SearchResults from "./farm-fresh/pages/customer/components/SearchResults";
import ProductDetails from "./farm-fresh/pages/customer/ProductDetails";
import Cart from "./farm-fresh/pages/customer/Cart";

export default function App() {
  return (
    <Routes>
  <Route path="/" element={<Navigate to="/customer-home" replace />} />

  <Route path="/customer-home" element={<CustomerHome />} />

  <Route path="/category/:id" element={<CategoryProducts />} />

  <Route path="/product/:id" element={<ProductDetails />} />

  <Route path="/cart" element={<Cart />} />

  <Route path="/search" element={<SearchResults />} />

  <Route path="/customer-register" element={<CustomerRegister />} />

  <Route path="/customer-login" element={<CustomerLogin />} />

  <Route path="/otp-login" element={<OTPLogin />} />

  <Route path="/forgot-password" element={<ForgotPassword />} />

  <Route path="/reset-password" element={<ResetPassword />} />

  <Route
    path="/customer/dashboard"
    element={
      <CustomerProtectedRoute>
        <CustomerDashboard />
      </CustomerProtectedRoute>
    }
  />
</Routes>
  );
}