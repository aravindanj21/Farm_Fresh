import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h2>Invoice & Billing System</h2>
        <span>Admin Dashboard</span>
      </div>

      <div className="profile-card">
        <div className="avatar">A</div>

        <div className="profile-info">
          <h4>Admin</h4>
          <p>Administrator</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;