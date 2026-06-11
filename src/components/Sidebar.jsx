import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const role = localStorage.getItem("role") || "admin";

  const [supplierOpen, setSupplierOpen] = useState(false);
  const [vendorOpen, setVendorOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">
        Admin
      </h2>

      {role === "admin" && (
        <ul className="sidebar-menu">

         
          <li>
            <div
              className="menu-dropdown"
              onClick={() => setSupplierOpen(!supplierOpen)}
            >
              <span>Suppliers</span>
              <span>{supplierOpen ? "▲" : "▼"}</span>
            </div>

            {supplierOpen && (
              <ul className="submenu">
                <li>
                  <Link to="/supplier/stock-list">
                    Stock List
                  </Link>
                </li>

                <li>
                  <Link to="/supplier/vendor-requests">
                    Vendor Requests
                  </Link>
                </li>
              </ul>
            )}
          </li>

          
          <li>
            <div
              className="menu-dropdown"
              onClick={() => setVendorOpen(!vendorOpen)}
            >
              <span>Vendors</span>
              <span>{vendorOpen ? "▲" : "▼"}</span>
            </div>

            {vendorOpen && (
              <ul className="submenu">
                <li>
                  <Link to="/vendor/browse-products">
                    Browse Products
                  </Link>
                </li>

                <li>
                  <Link to="/vendor/my-orders">
                    My Orders
                  </Link>
                </li>
              </ul>
            )}
          </li>

          
          <li>
            <div
              className="menu-dropdown"
              onClick={() => setAdminOpen(!adminOpen)}
            >
              <span>Admin</span>
              <span>{adminOpen ? "▲" : "▼"}</span>
            </div>

            {adminOpen && (
              <ul className="submenu">
                <li>
                  <Link to="/admin/products">
                    Products
                  </Link>
                </li>

                <li>
                  <Link to="/admin/orders">
                    Orders
                  </Link>
                </li>

                <li>
                  <Link to="/admin/invoices">
                    Invoices
                  </Link>
                </li>
                 <li>
                  <Link to="/admin/suppliers">
                    Suppliers
                  </Link>
                </li>
                 <li>
                  <Link to="/admin/vendors">
                    Vendors
                  </Link>
                </li>
              </ul>
            )}
          </li>

        </ul>
      )}

      {role === "supplier" && (
        <ul className="sidebar-menu">
          <li>
            <Link to="/supplier/stock-list">
              Stock List
            </Link>
          </li>

          <li>
            <Link to="/supplier/vendor-requests">
              Vendor Requests
            </Link>
          </li>
        </ul>
      )}

      {role === "vendor" && (
        <ul className="sidebar-menu">
          <li>
            <Link to="/vendor/browse-products">
              Browse Products
            </Link>
          </li>

          <li>
            <Link to="/vendor/my-orders">
              My Orders
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;