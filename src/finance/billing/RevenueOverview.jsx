import React, { useEffect, useState } from "react";

const RevenueOverview = () => {
  const [invoices, setInvoices] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const storedInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    setInvoices(storedInvoices);

    const revenueMap = {};

    storedInvoices.forEach((invoice) => {
      if (!invoice.invoiceDate) return;

      const month = new Date(
        invoice.invoiceDate
      ).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      revenueMap[month] =
        (revenueMap[month] || 0) +
        Number(invoice.totalAmount || 0);
    });

    const revenueData = Object.entries(
      revenueMap
    ).map(([month, amount]) => ({
      month,
      amount,
    }));

    setMonthlyRevenue(revenueData);
  }, []);

  const totalRevenue = invoices.reduce(
    (sum, invoice) =>
      sum + Number(invoice.totalAmount || 0),
    0
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Revenue Overview
      </h1>

      <div style={styles.summaryCard}>
        <h3>Total Revenue</h3>
        <h2>
          ₹ {totalRevenue.toLocaleString()}
        </h2>
      </div>

      <div style={styles.tableContainer}>
        <h2>Monthly Revenue Report</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue Amount</th>
            </tr>
          </thead>

          <tbody>
            {monthlyRevenue.length > 0 ? (
              monthlyRevenue.map(
                (item, index) => (
                  <tr key={index}>
                    <td>{item.month}</td>

                    <td>
                      ₹{" "}
                      {item.amount.toLocaleString()}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="2"
                  style={styles.noData}
                >
                  No Revenue Data Available
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
    padding: "25px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },

  heading: {
    marginBottom: "20px",
    color: "#1e293b",
  },

  summaryCard: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
    textAlign: "center",
    marginBottom: "30px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  tableContainer: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },

  noData: {
    textAlign: "center",
    padding: "20px",
    fontWeight: "bold",
    color: "#64748b",
  },
};

export default RevenueOverview;