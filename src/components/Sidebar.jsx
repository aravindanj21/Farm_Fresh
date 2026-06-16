import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [invoiceOpen, setInvoiceOpen] = useState(true);
  const [billingOpen, setBillingOpen] = useState(true);
  const [paymentOpen, setPaymentOpen] = useState(true);
  const [reportOpen, setReportOpen] = useState(true);

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <h2>Invoice System</h2>
      </div>

    
      <div>
        <button
          style={styles.menuButton}
          onClick={() => setInvoiceOpen(!invoiceOpen)}
        >
          Invoices
        </button>

        {invoiceOpen && (
          <div style={styles.subMenu}>
            <NavLink
              to="/finance/create-invoice"
              style={({ isActive }) => ({
                ...styles.subLink,
                background: isActive
                  ? "#2563eb"
                  : "transparent",
              })}
            >
              Create Invoice
            </NavLink>

            <NavLink
              to="/finance/invoices"
              style={({ isActive }) => ({
                ...styles.subLink,
                background: isActive
                  ? "#2563eb"
                  : "transparent",
              })}
            >
              Invoice List
            </NavLink>

            <NavLink
              to="/finance/view-invoice"
              style={({ isActive }) => ({
                ...styles.subLink,
                background: isActive
                  ? "#2563eb"
                  : "transparent",
              })}
            >
              View Invoice
            </NavLink>
          </div>
        )}
      </div>

      
      <div>
        <button
          style={styles.menuButton}
          onClick={() => setBillingOpen(!billingOpen)}
        >
          Billing
        </button>

        {billingOpen && (
          <div style={styles.subMenu}>
            <NavLink
              to="/finance/billing"
              style={({ isActive }) => ({
                ...styles.subLink,
                background: isActive
                  ? "#2563eb"
                  : "transparent",
              })}
            >
              Billing Dashboard
            </NavLink>

            <NavLink
              to="/finance/revenue-overview"
              style={({ isActive }) => ({
                ...styles.subLink,
                background: isActive
                  ? "#2563eb"
                  : "transparent",
              })}
            >
              Revenue Overview
            </NavLink>

            <NavLink
              to="/finance/paid-amount"
              style={({ isActive }) => ({
                ...styles.subLink,
                background: isActive
                  ? "#2563eb"
                  : "transparent",
              })}
            >
              Paid Amount
            </NavLink>

            <NavLink
              to="/finance/pending-amount"
              style={({ isActive }) => ({
                ...styles.subLink,
                background: isActive
                  ? "#2563eb"
                  : "transparent",
              })}
            >
              Pending Amount
            </NavLink>

            <NavLink
              to="/finance/overdue-amount"
              style={({ isActive }) => ({
                ...styles.subLink,
                background: isActive
                  ? "#2563eb"
                  : "transparent",
              })}
            >
              Overdue Amount
            </NavLink>
          </div>
        )}
      </div>

      
      <div>
        <button
          style={styles.menuButton}
          onClick={() => setPaymentOpen(!paymentOpen)}
        >
          Payments
        </button>

        {paymentOpen && (
          <div style={styles.subMenu}>
            <NavLink
              to="/finance/payments"
              style={({ isActive }) => ({
                ...styles.subLink,
                background: isActive
                  ? "#2563eb"
                  : "transparent",
              })}
            >
              Payment History
            </NavLink>

            <NavLink
              to="/finance/payment-status"
              style={({ isActive }) => ({
                ...styles.subLink,
                background: isActive
                  ? "#2563eb"
                  : "transparent",
              })}
            >
              Payment Status
            </NavLink>

            <NavLink
              to="/finance/transaction-details"
              style={({ isActive }) => ({
                ...styles.subLink,
                background: isActive
                  ? "#2563eb"
                  : "transparent",
              })}
            >
              Transaction Details
            </NavLink>
          </div>
        )}
      </div>

      
      <div>
        <button
          style={styles.menuButton}
          onClick={() => setReportOpen(!reportOpen)}
        >
          Reports
        </button>

        {reportOpen && (
          <div style={styles.subMenu}>
            
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "270px",
    minHeight: "100vh",
    background: "#1e293b",
    color: "#ffffff",
    padding: "20px",
    boxSizing: "border-box",
    overflowY: "auto",
  },

  logo: {
    textAlign: "center",
    marginBottom: "30px",
    borderBottom: "1px solid #334155",
    paddingBottom: "15px",
  },

  menuButton: {
    width: "100%",
    textAlign: "left",
    padding: "12px",
    background: "#334155",
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    borderRadius: "6px",
    marginBottom: "5px",
    fontSize: "15px",
    fontWeight: "600",
  },

  subMenu: {
    marginLeft: "10px",
    marginBottom: "15px",
  },

  subLink: {
    display: "block",
    padding: "10px",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "5px",
    marginBottom: "5px",
    transition: "0.3s",
  },
};

export default Sidebar;