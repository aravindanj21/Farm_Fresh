import React, { useState } from "react";
import GlobalSearch from "./GlobalSearch";
import "./Navbar.css";


import {
  products,
  suppliers,
  vendors,
  orders,
  invoices,
} from "../data/appData";

const Navbar = () => {
  const [results, setResults] = useState(null);

  const handleGlobalSearch = (keyword) => {
    if (!keyword.trim()) {
      setResults(null);
      return;
    }

    keyword = keyword.toLowerCase();

    const searchResults = {
      products: products.filter(
        (p) =>
          p.productName.toLowerCase().includes(keyword) ||
          p.category.toLowerCase().includes(keyword)
      ),

      suppliers: suppliers.filter(
        (s) =>
          s.supplierName.toLowerCase().includes(keyword) ||
          s.businessName.toLowerCase().includes(keyword)
      ),

      vendors: vendors.filter(
        (v) =>
          v.vendorName.toLowerCase().includes(keyword) ||
          v.businessName.toLowerCase().includes(keyword)
      ),

      orders: orders.filter(
        (o) =>
          o.orderId.toLowerCase().includes(keyword) ||
          o.productName.toLowerCase().includes(keyword)
      ),

      invoices: invoices.filter(
        (i) =>
          i.invoiceNumber.toLowerCase().includes(keyword) ||
          i.vendorName.toLowerCase().includes(keyword)
      ),
    };

    setResults(searchResults);
  };

  return (
    <>
      <div className="navbar">
        <h2>Admin Management</h2>

        <GlobalSearch onSearch={handleGlobalSearch} />
      </div>

      {results && (
        <div className="global-results">
          <h3>Search Results</h3>

          <h4>Products</h4>
          {results.products.map((p) => (
            <p key={p.id}>
              {p.productName} - {p.category}
            </p>
          ))}

          <h4>Suppliers</h4>
          {results.suppliers.map((s) => (
            <p key={s.id}>{s.supplierName}</p>
          ))}

          <h4>Vendors</h4>
          {results.vendors.map((v) => (
            <p key={v.id}>{v.vendorName}</p>
          ))}

          <h4>Orders</h4>
          {results.orders.map((o) => (
            <p key={o.id}>{o.orderId}</p>
          ))}

          <h4>Invoices</h4>
          {results.invoices.map((i) => (
            <p key={i.id}>{i.invoiceNumber}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;