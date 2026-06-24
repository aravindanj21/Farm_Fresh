import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import VerificationBanner from "../components/VerificationBanner";
import VerificationStatusCard from "../components/VerificationStatusCard";
import "../styles/SupplierDashboard.css";

import {
  getVerificationStatus
} from "../services/verificationService";

const SupplierDashboard = () => {

  const navigate = useNavigate();

  const [
    verificationStatus,
    setVerificationStatus
  ] = useState("pending");

   console.log(
    "verificationStatus =",
    verificationStatus
  );

  
  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(() => {
    fetchVerificationStatus();
  }, []);

  const fetchVerificationStatus = async () => {
  try {

    const supplierId =
      localStorage.getItem("user_id");

    const res =
      await getVerificationStatus(
        supplierId
      );

    console.log("Verification Response:", res);

    setVerificationStatus(
      res.status
    );

  } catch (error) {

    console.error(
      "Verification Status Error:",
      error
    );

    setVerificationStatus(
      "approved"
    ); 

  } finally {

    setLoading(false);

  }
};

  const handleAddProduct = () => {

    if (
      verificationStatus !==
      "approved"
    ) {

      alert(
        "Supplier verification required before adding products."
      );

      return;
    }

    navigate("/add-product");
  };

  const handleOrders = () => {

    if (
      verificationStatus !==
      "approved"
    ) {

      alert(
        "Supplier verification required before processing orders."
      );

      return;
    }

    navigate("/supplier-orders");
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="supplier-dashboard">

      <div className="dashboard-navbar">

  <div className="navbar-left">
    <h2>Welcome Supplier </h2>
  </div>

  <div className="navbar-right">

    <div
      className="notification-icon"
      onClick={() => alert("No new notifications")}
    >
      🔔
      
    </div>

    <button
      className="logout-btn"
      onClick={() => {
        localStorage.clear();
        navigate("/login");
      }}
    >
      Logout
    </button>

  </div>

</div>

      

      <h1>
        Supplier Dashboard
      </h1>
      

      <VerificationStatusCard
        status={verificationStatus}
      />

      {verificationStatus !==
        "approved" && (
        <VerificationBanner
          status={
            verificationStatus
          }
        />
      )}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>
            Products
          </h3>

          <p>
            Manage your products
          </p>

          <button
            onClick={
              handleAddProduct
            }
            disabled={
              verificationStatus !==
              "approved"
            }
          >
            Add Product
          </button>
        </div>

        <div className="dashboard-card">
          <h3>
            Orders
          </h3>

          <p>
            Process vendor orders
          </p>

          <button
            onClick={
              handleOrders
            }
            disabled={
              verificationStatus !==
              "approved"
            }
          >
            View Orders
          </button>
        </div>

        <div className="dashboard-card">
          <h3>
            Verification
          </h3>

          <p>
            Supplier verification
            details
          </p>

          <button
            onClick={() =>
              navigate(
                "/supplier-verification"
              )
            }
          >
            View Verification
          </button>
        </div>

      </div>

    </div>
  );
};

export default SupplierDashboard;
