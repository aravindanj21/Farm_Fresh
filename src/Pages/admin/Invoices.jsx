import React, { useState } from "react";
import "./Invoices.css";

const Invoices = () => {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    invoiceStatus: "",
    fromDate: "",
    toDate: "",
  });

  const [invoices] = useState([
    {
      id: 1,
      invoiceNumber: "INV1001",
      vendorName: "ABC Traders",
      supplierName: "Tech Supplier",
      amount: 250000,
      invoiceStatus: "Paid",
      invoiceDate: "2026-06-01",
    },
    {
      id: 2,
      invoiceNumber: "INV1002",
      vendorName: "XYZ Stores",
      supplierName: "ABC Suppliers",
      amount: 12000,
      invoiceStatus: "Pending",
      invoiceDate: "2026-06-03",
    },
    {
      id: 3,
      invoiceNumber: "INV1003",
      vendorName: "Smart Mart",
      supplierName: "Office World",
      amount: 45000,
      invoiceStatus: "Overdue",
      invoiceDate: "2026-06-05",
    },
    {
      id: 4,
      invoiceNumber: "INV1004",
      vendorName: "Retail Hub",
      supplierName: "Tech Supplier",
      amount: 18000,
      invoiceStatus: "Paid",
      invoiceDate: "2026-06-08",
    },
  ]);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      invoice.vendorName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      invoice.supplierName
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      !filters.invoiceStatus ||
      invoice.invoiceStatus === filters.invoiceStatus;

    const matchesFromDate =
      !filters.fromDate ||
      new Date(invoice.invoiceDate) >=
        new Date(filters.fromDate);

    const matchesToDate =
      !filters.toDate ||
      new Date(invoice.invoiceDate) <=
        new Date(filters.toDate);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesFromDate &&
      matchesToDate
    );
  });

  return (
    <div className="invoices-container">
      <h2>Invoices Management</h2>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search Invoice / Vendor / Supplier"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={filters.invoiceStatus}
          onChange={(e) =>
            setFilters({
              ...filters,
              invoiceStatus: e.target.value,
            })
          }
        >
          <option value="">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
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

      
      <table className="invoices-table">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Vendor Name</th>
            <th>Supplier Name</th>
            <th>Amount (₹)</th>
            <th>Status</th>
            <th>Invoice Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.vendorName}</td>
                <td>{invoice.supplierName}</td>
                <td>₹{invoice.amount}</td>
                <td>
                  <span
                    className={`status ${invoice.invoiceStatus.toLowerCase()}`}
                  >
                    {invoice.invoiceStatus}
                  </span>
                </td>
                <td>{invoice.invoiceDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No Invoices Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;