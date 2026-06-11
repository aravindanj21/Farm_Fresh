
import React, { useState } from "react";
import "./StockList.css";

const StockList = () => {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    category: "",
    stockStatus: "",
    productStatus: "",
  });

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [products] = useState([
    {
      id: 1,
      productName: "Laptop",
      category: "Electronics",
      stock: 50,
      stockStatus: "In Stock",
      productStatus: "Active",
    },
    {
      id: 2,
      productName: "Mobile",
      category: "Electronics",
      stock: 0,
      stockStatus: "Out Of Stock",
      productStatus: "Inactive",
    },
    {
      id: 3,
      productName: "Rice",
      category: "Groceries",
      stock: 120,
      stockStatus: "In Stock",
      productStatus: "Active",
    },
    {
      id: 4,
      productName: "Sugar",
      category: "Groceries",
      stock: 0,
      stockStatus: "Out Of Stock",
      productStatus: "Inactive",
    },
    {
      id: 5,
      productName: "Keyboard",
      category: "Electronics",
      stock: 35,
      stockStatus: "In Stock",
      productStatus: "Active",
    },
    {
      id: 6,
      productName: "Monitor",
      category: "Electronics",
      stock: 20,
      stockStatus: "In Stock",
      productStatus: "Active",
    },
    {
      id: 7,
      productName: "Wheat",
      category: "Groceries",
      stock: 80,
      stockStatus: "In Stock",
      productStatus: "Active",
    },
  ]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.productName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        !filters.category ||
        product.category === filters.category;

      const matchesStockStatus =
        !filters.stockStatus ||
        product.stockStatus === filters.stockStatus;

      const matchesProductStatus =
        !filters.productStatus ||
        product.productStatus === filters.productStatus;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStockStatus &&
        matchesProductStatus
      );
    })
    .sort((a, b) => {
      if (!sortField) return 0;

      const valueA = a[sortField];
      const valueB = b[sortField];

      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : -1;
      }

      return valueA < valueB ? 1 : -1;
    });

  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  return (
    <div className="stock-container">
      <h2>Stock List</h2>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search Product Name / Category"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
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
          <option value="Electronics">
            Electronics
          </option>
          <option value="Groceries">
            Groceries
          </option>
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
          <option value="">
            All Stock Status
          </option>
          <option value="In Stock">
            In Stock
          </option>
          <option value="Out Of Stock">
            Out Of Stock
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
          <option value="">
            All Product Status
          </option>
          <option value="Active">
            Active
          </option>
          <option value="Inactive">
            Inactive
          </option>
        </select>
      </div>

      <table className="stock-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID
            </th>

            <th
              onClick={() =>
                handleSort("productName")
              }
            >
              Product Name
            </th>

            <th
              onClick={() =>
                handleSort("category")
              }
            >
              Category
            </th>

            <th
              onClick={() =>
                handleSort("stock")
              }
            >
              Stock
            </th>

            <th
              onClick={() =>
                handleSort("stockStatus")
              }
            >
              Stock Status
            </th>

            <th
              onClick={() =>
                handleSort("productStatus")
              }
            >
              Product Status
            </th>
          </tr>
        </thead>

        <tbody>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>{product.stockStatus}</td>
                <td>{product.productStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{ textAlign: "center" }}
              >
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StockList;

