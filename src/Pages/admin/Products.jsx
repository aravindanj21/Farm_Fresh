import React, { useState } from "react";
import "./Products.css";

const Products = () => {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    category: "",
    productStatus: "",
    stockStatus: "",
  });

  const [products] = useState([
    {
      id: 1,
      productName: "Laptop",
      supplierName: "Tech Supplier",
      category: "Electronics",
      price: 50000,
      stock: 25,
      stockStatus: "In Stock",
      productStatus: "Active",
    },
    {
      id: 2,
      productName: "Keyboard",
      supplierName: "ABC Suppliers",
      category: "Accessories",
      price: 1200,
      stock: 0,
      stockStatus: "Out of Stock",
      productStatus: "Inactive",
    },
    {
      id: 3,
      productName: "Mouse",
      supplierName: "ABC Suppliers",
      category: "Accessories",
      price: 800,
      stock: 50,
      stockStatus: "In Stock",
      productStatus: "Active",
    },
    {
      id: 4,
      productName: "Monitor",
      supplierName: "Tech Supplier",
      category: "Electronics",
      price: 15000,
      stock: 10,
      stockStatus: "Low Stock",
      productStatus: "Active",
    },
    {
      id: 5,
      productName: "Printer",
      supplierName: "Office World",
      category: "Office Equipment",
      price: 9000,
      stock: 0,
      stockStatus: "Out of Stock",
      productStatus: "Inactive",
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

    const matchesProductStatus =
      !filters.productStatus ||
      product.productStatus === filters.productStatus;

    const matchesStockStatus =
      !filters.stockStatus ||
      product.stockStatus === filters.stockStatus;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesProductStatus &&
      matchesStockStatus
    );
  });

  return (
    <div className="products-container">
      <h2>Products Management</h2>

     
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

        <select
          value={filters.productStatus}
          onChange={(e) =>
            setFilters({
              ...filters,
              productStatus: e.target.value,
            })
          }
        >
          <option value="">All Product Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          value={filters.stockStatus}
          onChange={(e) =>
            setFilters({
              ...filters,
              stockStatus: e.target.value,
            })
          }
        >
          <option value="">All Stock Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">
            Out of Stock
          </option>
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
            <th>Stock</th>
            <th>Stock Status</th>
            <th>Product Status</th>
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
                <td>{product.stock}</td>
                <td>
                  <span
                    className={`stock-status ${product.stockStatus
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {product.stockStatus}
                  </span>
                </td>
                <td>
                  <span
                    className={`product-status ${product.productStatus.toLowerCase()}`}
                  >
                    {product.productStatus}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;