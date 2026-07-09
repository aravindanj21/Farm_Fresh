import React from "react";
import { Routes, Route } from "react-router-dom";

import CustomerRegister from "./farm-fresh/pages/customer/CustomerRegister";
import CustomerLogin from "./farm-fresh/pages/customer/CustomerLogin";
import OTPLogin from "./farm-fresh/pages/customer/OTPLogin";
import ForgotPassword from "./farm-fresh/pages/customer/ForgotPassword";
import ResetPassword from "./farm-fresh/pages/customer/ResetPassword";
import CustomerDashboard from "./farm-fresh/pages/customer/CustomerDashboar";
import CustomerProtectedRoute from "./farm-fresh/pages/customer/CustomerProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route
        path="/customer-register"
        element={<CustomerRegister />}
      />

      <Route
        path="/customer-login"
        element={<CustomerLogin />}
      />

      <Route
        path="/otp-login"
        element={<OTPLogin />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

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