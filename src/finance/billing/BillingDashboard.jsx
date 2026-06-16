import React, { useEffect, useState } from "react";

const BillingDashboard = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const storedInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    setInvoices(storedInvoices);
  }, []);

  const totalRevenue = invoices.reduce(
    (sum, invoice) =>
      sum + Number(invoice.totalAmount || 0),
    0
  );

  const paidAmount = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce(
      (sum, invoice) =>
        sum + Number(invoice.totalAmount || 0),
      0
    );

  const pendingAmount = invoices
    .filter((invoice) => invoice.status === "Pending")
    .reduce(
      (sum, invoice) =>
        sum + Number(invoice.totalAmount || 0),
      0
    );

  const overdueAmount = invoices
    .filter((invoice) => invoice.status === "Overdue")
    .reduce(
      (sum, invoice) =>
        sum + Number(invoice.totalAmount || 0),
      0
    );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Billing Dashboard
      </h1>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Total Revenue</h3>
          <h2>
            ₹ {totalRevenue.toLocaleString()}
          </h2>
        </div>

        <div style={styles.card}>
          <h3>Paid Amount</h3>
          <h2>
            ₹ {paidAmount.toLocaleString()}
          </h2>
        </div>

        <div style={styles.card}>
          <h3>Pending Amount</h3>
          <h2>
            ₹ {pendingAmount.toLocaleString()}
          </h2>
        </div>

        <div style={styles.card}>
          <h3>Overdue Amount</h3>
          <h2>
            ₹ {overdueAmount.toLocaleString()}
          </h2>
        </div>
      </div>

      <div style={styles.summarySection}>
        <h2>Billing Summary</h2>

        <div style={styles.summaryGrid}>
          <div style={styles.summaryCard}>
            <h4>Total Invoices</h4>
            <p>{invoices.length}</p>
          </div>

          <div style={styles.summaryCard}>
            <h4>Paid Invoices</h4>
            <p>
              {
                invoices.filter(
                  (invoice) =>
                    invoice.status === "Paid"
                ).length
              }
            </p>
          </div>

          <div style={styles.summaryCard}>
            <h4>Pending Invoices</h4>
            <p>
              {
                invoices.filter(
                  (invoice) =>
                    invoice.status === "Pending"
                ).length
              }
            </p>
          </div>

          <div style={styles.summaryCard}>
            <h4>Overdue Invoices</h4>
            <p>
              {
                invoices.filter(
                  (invoice) =>
                    invoice.status === "Overdue"
                ).length
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "#eef2ff",
  },

  heading: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "30px",
    textAlign: "center",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    marginBottom: "35px",
  },

  card: {
    padding: "30px",
    borderRadius: "18px",
    color: "#fff",
    textAlign: "center",
    background:
      "linear-gradient(135deg, #4f46e5, #7c3aed)",
    boxShadow: "0 10px 25px rgba(79,70,229,0.25)",
    transition: "0.3s",
  },

  summarySection: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "25px",
  },

  summaryCard: {
    background: "#f8fafc",
    borderRadius: "15px",
    padding: "25px",
    textAlign: "center",
    border: "2px solid #e2e8f0",
    transition: "0.3s",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
};
export default BillingDashboard;