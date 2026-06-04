import React from 'react'

const SupplierApproval = ({
  orders,
  setOrders
}) => {
  const approveOrder = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: 'Approved'
            }
          : order
      )
    )
  }

  const rejectOrder = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: 'Rejected'
            }
          : order
      )
    )
  }

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status === 'Pending'
    )

  return (
    <div
      style={{
        padding: '20px'
      }}
    >
      <h2>Supplier Approval</h2>

      <table
        className="order-table"
      >
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Vendor</th>
            <th>Supplier</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {pendingOrders.length >
          0 ? (
            pendingOrders.map(
              (order) => (
                <tr
                  key={order.id}
                >
                  <td>
                    {order.id}
                  </td>

                  <td>
                    {order.vendor}
                  </td>

                  <td>
                    {order.supplier}
                  </td>

                  <td>
                    {order.product}
                  </td>

                  <td>
                    {order.quantity}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        approveOrder(
                          order.id
                        )
                      }
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        rejectOrder(
                          order.id
                        )
                      }
                      style={{
                        marginLeft:
                          '10px'
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign:
                    'center'
                }}
              >
                No Pending Orders
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SupplierApproval