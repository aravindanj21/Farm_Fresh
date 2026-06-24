import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

const SupplierOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const supplierId = localStorage.getItem("supplier_id");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/supplier/orders/${supplierId}`
      );

      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f4f7fc",
      padding: "30px"
    },

    heading: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#1e293b",
      fontSize: "30px",
      fontWeight: "700"
    },

    tableContainer: {
      background: "#fff",
      borderRadius: "20px",
      padding: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      overflowX: "auto"
    },

    table: {
      width: "100%",
      borderCollapse: "collapse"
    },

    th: {
      background: "#2563eb",
      color: "#fff",
      padding: "15px",
      textAlign: "left",
      fontSize: "15px"
    },

    td: {
      padding: "15px",
      borderBottom: "1px solid #e5e7eb",
      fontSize: "14px"
    },

    row: {
      transition: "0.3s"
    },

    pending: {
      background: "#fef3c7",
      color: "#92400e",
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "600"
    },

    accepted: {
      background: "#dcfce7",
      color: "#166534",
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "600"
    },

    rejected: {
      background: "#fee2e2",
      color: "#991b1b",
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "600"
    },

    empty: {
      textAlign: "center",
      padding: "30px",
      color: "#64748b"
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return styles.accepted;
      case "rejected":
        return styles.rejected;
      default:
        return styles.pending;
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>📦 Supplier Orders</h2>

      <div style={styles.tableContainer}>
        {loading ? (
          <p style={styles.empty}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p style={styles.empty}>No orders found</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Vendor</th>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={styles.row}>
                  <td style={styles.td}>{order.id}</td>
                  <td style={styles.td}>{order.vendor}</td>
                  <td style={styles.td}>{order.product}</td>
                  <td style={styles.td}>{order.quantity}</td>
                  <td style={styles.td}>
                    <span style={getStatusStyle(order.status)}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SupplierOrders;