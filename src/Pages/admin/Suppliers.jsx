import React, { useState } from "react";
import "./Suppliers.css";

const Suppliers = () => {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    status: "",
    location: "",
  });

  const [suppliers] = useState([
    {
      id: 1,
      supplierName: "Arun Kumar",
      businessName: "AK Electronics",
      mobileNumber: "9876543210",
      email: "arun@gmail.com",
      location: "Chennai",
      status: "Active",
    },
    {
      id: 2,
      supplierName: "Ravi Kumar",
      businessName: "RK Traders",
      mobileNumber: "9876543211",
      email: "ravi@gmail.com",
      location: "Coimbatore",
      status: "Inactive",
    },
    {
      id: 3,
      supplierName: "Suresh",
      businessName: "Suresh Enterprises",
      mobileNumber: "9876543212",
      email: "suresh@gmail.com",
      location: "Madurai",
      status: "Active",
    },
    {
      id: 4,
      supplierName: "Karthik",
      businessName: "Karthik Supplies",
      mobileNumber: "9876543213",
      email: "karthik@gmail.com",
      location: "Salem",
      status: "Pending",
    },
  ]);

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.supplierName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      supplier.businessName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      supplier.mobileNumber.includes(search);

    const matchesStatus =
      !filters.status ||
      supplier.status === filters.status;

    const matchesLocation =
      !filters.location ||
      supplier.location === filters.location;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesLocation
    );
  });

  return (
    <div className="suppliers-container">
      <h2>Suppliers</h2>

      
      <div className="filter-section">

        <input
          type="text"
          placeholder="Search Supplier / Business / Mobile"
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

     
      <table className="suppliers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier Name</th>
            <th>Business Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredSuppliers.length > 0 ? (
            filteredSuppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.id}</td>
                <td>{supplier.supplierName}</td>
                <td>{supplier.businessName}</td>
                <td>{supplier.mobileNumber}</td>
                <td>{supplier.email}</td>
                <td>{supplier.location}</td>
                <td>{supplier.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">
                No Suppliers Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Suppliers;