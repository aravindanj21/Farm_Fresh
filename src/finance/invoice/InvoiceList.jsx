import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    const storedInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    setInvoices(storedInvoices);
  };

  const deleteInvoice = (invoiceNumber) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (!confirmDelete) return;

    const updatedInvoices = invoices.filter(
      (invoice) =>
        invoice.invoiceNumber !== invoiceNumber
    );

    setInvoices(updatedInvoices);

    localStorage.setItem(
      "invoices",
      JSON.stringify(updatedInvoices)
    );

    alert("Invoice Deleted Successfully");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>
          Invoice List
        </h2>

        <button
          style={styles.createBtn}
          onClick={() =>
            navigate("/finance/create-invoice")
          }
        >
          + Create Invoice
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead
            style={{
              background: "#1e293b",
              color: "#ffffff",
            }}
          >
            <tr>
              <th style={styles.th}>
                Invoice No
              </th>
              <th style={styles.th}>
                Vendor
              </th>
              <th style={styles.th}>
                Supplier
              </th>
              <th style={styles.th}>
                Amount
              </th>
              <th style={styles.th}>
                Invoice Date
              </th>
              <th style={styles.th}>
                Due Date
              </th>
              <th style={styles.th}>
                Status
              </th>
              <th style={styles.th}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice, index) => (
                <tr
                  key={index}
                  style={styles.row}
                >
                  <td style={styles.td}>
                    {invoice.invoiceNumber}
                  </td>

                  <td style={styles.td}>
                    {invoice.vendorName}
                  </td>

                  <td style={styles.td}>
                    {invoice.supplierName}
                  </td>

                  <td style={styles.td}>
                    ₹
                    {Number(
                      invoice.totalAmount
                    ).toFixed(2)}
                  </td>

                  <td style={styles.td}>
                    {invoice.invoiceDate}
                  </td>

                  <td style={styles.td}>
                    {invoice.dueDate}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        background:
                          invoice.status ===
                          "Paid"
                            ? "#dcfce7"
                            : invoice.status ===
                              "Pending"
                            ? "#fef3c7"
                            : invoice.status ===
                              "Draft"
                            ? "#dbeafe"
                            : invoice.status ===
                              "Sent"
                            ? "#ede9fe"
                            : "#fee2e2",

                        color:
                          invoice.status ===
                          "Paid"
                            ? "#15803d"
                            : invoice.status ===
                              "Pending"
                            ? "#b45309"
                            : invoice.status ===
                              "Draft"
                            ? "#2563eb"
                            : invoice.status ===
                              "Sent"
                            ? "#7c3aed"
                            : "#dc2626",
                      }}
                    >
                      {invoice.status}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <div
                      style={
                        styles.actionButtons
                      }
                    >
                      <button
                        style={
                          styles.viewBtn
                        }
                        onClick={() =>
                          navigate(
                            "/finance/view-invoice",
                            {
                              state:
                                invoice,
                            }
                          )
                        }
                      >
                        View
                      </button>

                      <button
                        style={
                          styles.deleteBtn
                        }
                        onClick={() =>
                          deleteInvoice(
                            invoice.invoiceNumber
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={styles.noData}
                >
                  No Invoices Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "30px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    background: "#ffffff",
    padding: "20px 25px",
    borderRadius: "15px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
  },

  heading: {
    margin: 0,
    color: "#1e293b",
  },

  createBtn: {
    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },

  tableContainer: {
    background: "#ffffff",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow:
      "0 6px 20px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    padding: "15px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
  },

  td: {
    padding: "15px",
    fontSize: "14px",
    color: "#334155",
  },

  row: {
    borderBottom:
      "1px solid #e5e7eb",
  },

  status: {
    padding: "7px 14px",
    borderRadius: "25px",
    fontSize: "12px",
    fontWeight: "700",
    display: "inline-block",
  },

  actionButtons: {
    display: "flex",
    gap: "8px",
  },

  viewBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  noData: {
    textAlign: "center",
    padding: "40px",
    color: "#64748b",
    fontWeight: "600",
    fontSize: "16px",
  },
};

export default InvoiceList;