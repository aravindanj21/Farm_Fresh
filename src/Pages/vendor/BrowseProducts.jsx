import React, { useState } from "react";
import "./BrowseProducts.css";

const BrowseProducts = () => {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    category: "",
    availability: "",
    minPrice: "",
    maxPrice: "",
  });

  const [products] = useState([
    {
      id: 1,
      productName: "Laptop",
      supplierName: "Tech Supplier",
      category: "Electronics",
      price: 50000,
      availability: "Available",
    },
    {
      id: 2,
      productName: "Keyboard",
      supplierName: "ABC Suppliers",
      category: "Accessories",
      price: 1200,
      availability: "Available",
    },
    {
      id: 3,
      productName: "Mouse",
      supplierName: "ABC Suppliers",
      category: "Accessories",
      price: 800,
      availability: "Unavailable",
    },
    {
      id: 4,
      productName: "Monitor",
      supplierName: "Tech Supplier",
      category: "Electronics",
      price: 15000,
      availability: "Available",
    },
    {
      id: 5,
      productName: "Printer",
      supplierName: "Office World",
      category: "Office Equipment",
      price: 9000,
      availability: "Unavailable",
    },
  ]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.productName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.supplierName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      !filters.category ||
      product.category === filters.category;

    const matchesAvailability =
      !filters.availability ||
      product.availability === filters.availability;

    const matchesMinPrice =
      !filters.minPrice ||
      product.price >= Number(filters.minPrice);

    const matchesMaxPrice =
      !filters.maxPrice ||
      product.price <= Number(filters.maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesAvailability &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  return (
    <div className="browse-products-container">
      <h2>Browse Products</h2>

      
      <div className="filter-section">

        <input
          type="text"
          placeholder="Search Product / Supplier / Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({
              ...filters,
              category: e.target.value,
            })
          }
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Office Equipment">
            Office Equipment
          </option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) =>
            setFilters({
              ...filters,
              minPrice: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({
              ...filters,
              maxPrice: e.target.value,
            })
          }
        />

        <select
          value={filters.availability}
          onChange={(e) =>
            setFilters({
              ...filters,
              availability: e.target.value,
            })
          }
        >
          <option value="">Availability</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>

      
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Supplier Name</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Availability</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.supplierName}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.availability}</td>
                <td>
                  <button className="view-btn">
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BrowseProducts;