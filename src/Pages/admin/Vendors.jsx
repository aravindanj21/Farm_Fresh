import React, { useState } from "react";
import "./Vendors.css";

const Vendors = () => {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    status: "",
    location: "",
  });

  const [vendors] = useState([
    {
      id: 1,
      vendorName: "Rahul Sharma",
      businessName: "RS Mart",
      mobileNumber: "9876543201",
      email: "rahul@gmail.com",
      location: "Chennai",
      status: "Active",
    },
    {
      id: 2,
      vendorName: "Priya Traders",
      businessName: "Priya Enterprises",
      mobileNumber: "9876543202",
      email: "priya@gmail.com",
      location: "Coimbatore",
      status: "Inactive",
    },
    {
      id: 3,
      vendorName: "Vijay Kumar",
      businessName: "VK Stores",
      mobileNumber: "9876543203",
      email: "vijay@gmail.com",
      location: "Madurai",
      status: "Pending",
    },
    {
      id: 4,
      vendorName: "Kannan",
      businessName: "Kannan Retail",
      mobileNumber: "9876543204",
      email: "kannan@gmail.com",
      location: "Salem",
      status: "Active",
    },
  ]);

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.vendorName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      vendor.businessName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      vendor.mobileNumber.includes(search);

    const matchesStatus =
      !filters.status ||
      vendor.status === filters.status;

    const matchesLocation =
      !filters.location ||
      vendor.location === filters.location;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesLocation
    );
  });

  return (
    <div className="vendors-container">
      <h2>Vendors Management</h2>

      
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search Vendor / Business / Mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({
              ...filters,
              status: e.target.value,
            })
          }
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          value={filters.location}
          onChange={(e) =>
            setFilters({
              ...filters,
              location: e.target.value,
            })
          }
        >
          <option value="">All Locations</option>
          <option value="Chennai">Chennai</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Madurai">Madurai</option>
          <option value="Salem">Salem</option>
        </select>
      </div>

      
      <table className="vendors-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendor Name</th>
            <th>Business Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.id}</td>
                <td>{vendor.vendorName}</td>
                <td>{vendor.businessName}</td>
                <td>{vendor.mobileNumber}</td>
                <td>{vendor.email}</td>
                <td>{vendor.location}</td>
                <td>
                  <span
                    className={`status ${vendor.status.toLowerCase()}`}
                  >
                    {vendor.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No Vendors Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Vendors;