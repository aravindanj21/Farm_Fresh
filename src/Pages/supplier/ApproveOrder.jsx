import React, { useState } from "react";

const ApproveOrder = () => {
  const [orderId, setOrderId] = useState("");

  const approveOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/approve-order/${orderId}`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.log(error);
      alert("Error approving order");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Approve Order</h2>

      <input
        className="form-control mb-3"
        placeholder="Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      <button
        className="btn btn-success"
        onClick={approveOrder}
      >
        Approve Order
      </button>
    </div>
  );
};

export default ApproveOrder;
