import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const ViewInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const invoice = location.state;

  if (!invoice) {
    return (
      <div style={styles.container}>
        <div style={styles.noInvoiceCard}>
          <h2>No Invoice Selected</h2>

          <button
            style={styles.btn}
            onClick={() =>
              navigate("/finance/invoices")
            }
          >
            Back to Invoice List
          </button>
        </div>
      </div>
    );
  }

  const printInvoice = () => {
    window.print();
  };

  const downloadInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("INVOICE", 80, 20);

    doc.setFontSize(12);

    doc.text(
      `Invoice Number: ${invoice.invoiceNumber}`,
      20,
      40
    );

    doc.text(
      `Invoice Date: ${invoice.invoiceDate}`,
      20,
      50
    );

    doc.text(
      `Due Date: ${invoice.dueDate}`,
      20,
      60
    );

    doc.text(
      `Status: ${invoice.status}`,
      20,
      70
    );

    doc.text(
      `Vendor Name: ${invoice.vendorName}`,
      20,
      90
    );

    doc.text(
      `Supplier Name: ${invoice.supplierName}`,
      20,
      100
    );

    doc.text(
      `Product Details: ${invoice.productDetails}`,
      20,
      120
    );

    doc.text(
      `Quantity: ${invoice.quantity}`,
      20,
      130
    );

    doc.text(
      `Price: ₹ ${invoice.price}`,
      20,
      140
    );

    doc.text(
      `Tax: ${invoice.tax}%`,
      20,
      150
    );

    doc.setFontSize(14);

    doc.text(
      `Total Amount: ₹ ${Number(
        invoice.totalAmount
      ).toFixed(2)}`,
      20,
      170
    );

    doc.save(
      `${invoice.invoiceNumber}.pdf`
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.invoiceCard}>
        <h1 style={styles.title}>
          Invoice Details
        </h1>

        <hr />

        <div style={styles.section}>
          <h3>Invoice Information</h3>

          <p>
            <strong>Invoice Number:</strong>{" "}
            {invoice.invoiceNumber}
          </p>

          <p>
            <strong>Invoice Date:</strong>{" "}
            {invoice.invoiceDate}
          </p>

          <p>
            <strong>Due Date:</strong>{" "}
            {invoice.dueDate}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color:
                  invoice.status === "Paid"
                    ? "green"
                    : invoice.status ===
                      "Pending"
                    ? "orange"
                    : invoice.status ===
                      "Draft"
                    ? "#2563eb"
                    : "red",
                fontWeight: "bold",
              }}
            >
              {invoice.status}
            </span>
          </p>
        </div>

        <div style={styles.section}>
          <h3>Vendor Details</h3>
          <p>{invoice.vendorName}</p>
        </div>

        <div style={styles.section}>
          <h3>Supplier Details</h3>
          <p>{invoice.supplierName}</p>
        </div>

        <div style={styles.section}>
          <h3>Product Details</h3>

          <p>{invoice.productDetails}</p>

          <p>
            <strong>Quantity:</strong>{" "}
            {invoice.quantity}
          </p>

          <p>
            <strong>Price:</strong> ₹{" "}
            {invoice.price}
          </p>

          <p>
            <strong>Tax:</strong>{" "}
            {invoice.tax}%
          </p>
        </div>

        <div style={styles.totalBox}>
          <h2>
            Total Amount : ₹{" "}
            {Number(
              invoice.totalAmount
            ).toFixed(2)}
          </h2>
        </div>

        <div style={styles.btnContainer}>
          <button
            style={styles.btn}
            onClick={printInvoice}
          >
            Print Invoice
          </button>

          <button
            style={{
              ...styles.btn,
              background: "#16a34a",
            }}
            onClick={downloadInvoice}
          >
            Download PDF
          </button>

          <button
            style={{
              ...styles.btn,
              background: "#64748b",
            }}
            onClick={() =>
              navigate("/finance/invoices")
            }
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#eef2ff",
    padding: "40px 20px",
  },

  invoiceCard: {
    maxWidth: "950px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  noInvoiceCard: {
    maxWidth: "500px",
    margin: "100px auto",
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },

  title: {
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "#fff",
    textAlign: "center",
    padding: "25px",
    margin: 0,
    fontSize: "30px",
    fontWeight: "700",
    letterSpacing: "1px",
  },

  section: {
    margin: "20px",
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },

  totalBox: {
    margin: "20px",
    padding: "25px",
    background: "linear-gradient(135deg,#dcfce7,#bbf7d0)",
    borderRadius: "15px",
    textAlign: "center",
    border: "2px solid #16a34a",
  },

  btnContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    padding: "25px",
    flexWrap: "wrap",
  },

  btn: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "0.3s",
  },
};
export default ViewInvoice;
