import React, { useState } from "react";

const VendorRequests = () => {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    requestStatus: "",
    requestDate: "",
  });

  const [requests] = useState([
    {
      id: 1,
      vendorName: "ABC Traders",
      productName: "Laptop",
      quantity: 10,
      requestStatus: "Pending",
      requestDate: "2026-06-01",
    },
    {
      id: 2,
      vendorName: "XYZ Stores",
      productName: "Mobile",
      quantity: 15,
      requestStatus: "Approved",
      requestDate: "2026-06-02",
    },
    {
      id: 3,
      vendorName: "Smart Mart",
      productName: "Keyboard",
      quantity: 20,
      requestStatus: "Rejected",
      requestDate: "2026-06-03",
    },
    {
      id: 4,
      vendorName: "Tech World",
      productName: "Monitor",
      quantity: 5,
      requestStatus: "Pending",
      requestDate: "2026-06-04",
    },
  ]);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.vendorName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      request.productName
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      !filters.requestStatus ||
      request.requestStatus === filters.requestStatus;

    const matchesDate =
      !filters.requestDate ||
      request.requestDate === filters.requestDate;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="vendor-requests-container">
      <h2>Vendor Requests</h2>

     
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search Vendor Name / Product Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={filters.requestStatus}
          onChange={(e) =>
            setFilters({
              ...filters,
              requestStatus: e.target.value,
            })
          }
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input
          type="date"
          value={filters.requestDate}
          onChange={(e) =>
            setFilters({
              ...filters,
              requestDate: e.target.value,
            })
          }
        />
      </div>

      
      <table className="vendor-request-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendor Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Request Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.vendorName}</td>
                <td>{request.productName}</td>
                <td>{request.quantity}</td>
                <td>{request.requestStatus}</td>
                <td>{request.requestDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Requests Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorRequests;