import React, { useState } from "react";
import "./Orders.css";

const Orders = () => {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    orderStatus: "",
    fromDate: "",
    toDate: "",
  });

  const [orders] = useState([
    {
      id: 1,
      orderId: "ORD1001",
      vendorName: "ABC Traders",
      supplierName: "Tech Supplier",
      productName: "Laptop",
      quantity: 5,
      totalAmount: 250000,
      orderStatus: "Pending",
      orderDate: "2026-06-01",
    },
    {
      id: 2,
      orderId: "ORD1002",
      vendorName: "XYZ Stores",
      supplierName: "ABC Suppliers",
      productName: "Keyboard",
      quantity: 10,
      totalAmount: 12000,
      orderStatus: "Approved",
      orderDate: "2026-06-03",
    },
    {
      id: 3,
      orderId: "ORD1003",
      vendorName: "Smart Mart",
      supplierName: "Tech Supplier",
      productName: "Monitor",
      quantity: 3,
      totalAmount: 45000,
      orderStatus: "Delivered",
      orderDate: "2026-06-05",
    },
    {
      id: 4,
      orderId: "ORD1004",
      vendorName: "Retail Hub",
      supplierName: "Office World",
      productName: "Printer",
      quantity: 2,
      totalAmount: 18000,
      orderStatus: "Cancelled",
      orderDate: "2026-06-08",
    },
  ]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(search.toLowerCase()) ||
      order.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      order.supplierName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      !filters.orderStatus ||
      order.orderStatus === filters.orderStatus;

    const matchesFromDate =
      !filters.fromDate ||
      new Date(order.orderDate) >= new Date(filters.fromDate);

    const matchesToDate =
      !filters.toDate ||
      new Date(order.orderDate) <= new Date(filters.toDate);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesFromDate &&
      matchesToDate
    );
  });

  return (
    <div className="orders-container">
      <h2>Orders Management</h2>

     
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search Order ID / Vendor / Supplier"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={filters.orderStatus}
          onChange={(e) =>
            setFilters({
              ...filters,
              orderStatus: e.target.value,
            })
          }
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          value={filters.fromDate}
          onChange={(e) =>
            setFilters({
              ...filters,
              fromDate: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={filters.toDate}
          onChange={(e) =>
            setFilters({
              ...filters,
              toDate: e.target.value,
            })
          }
        />
      </div>

      
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Vendor Name</th>
            <th>Supplier Name</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Amount (₹)</th>
            <th>Status</th>
            <th>Order Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderId}</td>
                <td>{order.vendorName}</td>
                <td>{order.supplierName}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <span
                    className={`status ${order.orderStatus.toLowerCase()}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td>{order.orderDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;