import React from 'react'

const OrderViewModal = ({
  order,
  onClose
}) => {
  if (!order) return null

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Order Details</h3>

        <p>
          <strong>Order ID:</strong> {order.id}
        </p>

        <p>
          <strong>Vendor:</strong> {order.vendor}
        </p>

        <p>
          <strong>Supplier:</strong> {order.supplier}
        </p>

        <p>
          <strong>Product:</strong> {order.product}
        </p>

        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>

        <p>
          <strong>Status:</strong> {order.status}
        </p>

        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default OrderViewModal