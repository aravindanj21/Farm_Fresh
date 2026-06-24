import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

const AddProduct = () => {
  const [product, setProduct] = useState({
    supplier_id: localStorage.getItem("supplier_id") || "",
    category_id: "",
    product_name: "",
    description: "",
    price: "",
    stock: "",
    image_url: ""
  });

  console.log("Supplier ID:", product.supplier_id);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/api/products`,
        product
      );

      console.log(res.data);
      alert("Product Added Successfully");

      setProduct({
        supplier_id: localStorage.getItem("supplier_id") || "",
        category_id: "",
        product_name: "",
        description: "",
        price: "",
        stock: "",
        image_url: ""
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      padding: "20px"
    },

    card: {
      width: "500px",
      background: "#fff",
      borderRadius: "20px",
      padding: "30px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
    },

    heading: {
      textAlign: "center",
      marginBottom: "25px",
      color: "#333"
    },

    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box"
    },

    textarea: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
      minHeight: "100px"
    },

    button: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "10px",
      background: "#4facfe",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📦 Add Product</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="number"
            name="category_id"
            placeholder="Category ID"
            value={product.category_id}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="text"
            name="product_name"
            placeholder="Product Name"
            value={product.product_name}
            onChange={handleChange}
            required
          />

          <textarea
            style={styles.textarea}
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={product.stock}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={product.image_url}
            onChange={handleChange}
          />

          <button
            type="submit"
            style={styles.button}
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;