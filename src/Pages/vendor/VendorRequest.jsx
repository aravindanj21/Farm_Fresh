import React, { useState } from "react";

const VendorRequest = () => {
  const [formData, setFormData] = useState({
    request_id: "",
    vendor_name: "",
  
    supplier_email: "",
    product_name: "",
    quantity: "",
  });

  const [orderId, setOrderId] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/vendor-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOrderId(data.order_id);

        alert(
          `Request Created Successfully\nOrder ID: ${data.order_id}`
        );

        setFormData({
          request_id: "",
          vendor_name: "",
          supplier_email: "",
          product_name: "",
          quantity: "",
        });
      } else {
        alert(data.message || "Request Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send request");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Vendor Product Request</h2>

      <form onSubmit={submitRequest}>
        <input
          className="form-control mb-2"
          name="request_id"
          placeholder="Request ID"
          value={formData.request_id}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="vendor_name"
          placeholder="Vendor Name"
          value={formData.vendor_name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="supplier_email"
          placeholder="Supplier Email"
          value={formData.supplier_email}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="product_name"
          placeholder="Product Name"
          value={formData.product_name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          className="form-control mb-2"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary">
          Send Request
        </button>
      </form>

      {orderId && (
        <div className="alert alert-success mt-3">
          <h5>Order Generated Successfully</h5>
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
        </div>
      )}
    </div>
  );
};

export default VendorRequest;

