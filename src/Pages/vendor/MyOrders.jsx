import React, { useState } from "react";
import "./MyOrders.css";

const MyOrders = () => {
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
      productName: "Laptop",
      supplierName: "Tech Supplier",
      quantity: 5,
      amount: 250000,
      orderStatus: "Pending",
      orderDate: "2026-06-01",
    },
    {
      id: 2,
      orderId: "ORD1002",
      productName: "Keyboard",
      supplierName: "ABC Suppliers",
      quantity: 10,
      amount: 12000,
      orderStatus: "Shipped",
      orderDate: "2026-06-03",
    },
    {
      id: 3,
      orderId: "ORD1003",
      productName: "Mouse",
      supplierName: "ABC Suppliers",
      quantity: 20,
      amount: 16000,
      orderStatus: "Delivered",
      orderDate: "2026-06-05",
    },
    {
      id: 4,
      orderId: "ORD1004",
      productName: "Monitor",
      supplierName: "Tech Supplier",
      quantity: 3,
      amount: 45000,
      orderStatus: "Cancelled",
      orderDate: "2026-06-08",
    },
  ]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      order.productName
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      !filters.orderStatus ||
      order.orderStatus === filters.orderStatus;

    const matchesFromDate =
      !filters.fromDate ||
      new Date(order.orderDate) >=
        new Date(filters.fromDate);

    const matchesToDate =
      !filters.toDate ||
      new Date(order.orderDate) <=
        new Date(filters.toDate);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesFromDate &&
      matchesToDate
    );
  });

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>

      
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search Order ID / Product Name"
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
          <option value="Shipped">Shipped</option>
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
            <th>Product Name</th>
            <th>Supplier Name</th>
            <th>Quantity</th>
            <th>Amount (₹)</th>
            <th>Status</th>
            <th>Order Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderId}</td>
                <td>{order.productName}</td>
                <td>{order.supplierName}</td>
                <td>{order.quantity}</td>
                <td>₹{order.amount}</td>
                <td>{order.orderStatus}</td>
                <td>{order.orderDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                style={{ textAlign: "center" }}
              >
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;