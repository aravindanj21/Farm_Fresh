import React, { useState } from 'react'
import OrderViewModal from './OrderViewModal'
import OrderStatusUpdate from './OrderStatusUpdate'

const OrderTable = ({
  orders,
  setOrders,
  searchTerm,
  addNotification
}) => {

  const [selectedOrder, setSelectedOrder] =
    useState(null)

  const updateStatus = (
    id,
    status
  ) => {

    setOrders(
      orders.map(order => {

        if (order.id === id) {

          addNotification(
            'Order Status Changed',
            `${order.product} changed to ${status}`,
            'status_change'
          )

          return {
            ...order,
            status
          }
        }

        return order
      })
    )
  }

  const cancelOrder = (
    id
  ) => {

    const order =
      orders.find(
        item => item.id === id
      )

    if (order) {

      addNotification(
        'Order Cancelled',
        `${order.product} order cancelled`,
        'cancel'
      )
    }

    setOrders(
      orders.filter(
        order =>
          order.id !== id
      )
    )
  }

  const filteredOrders =
    orders.filter(order => {

      const search =
        searchTerm.toLowerCase()

      return (
        order.id
          .toLowerCase()
          .includes(search) ||

        order.vendor
          .toLowerCase()
          .includes(search) ||

        order.supplier
          .toLowerCase()
          .includes(search) ||

        order.product
          .toLowerCase()
          .includes(search) ||

        order.status
          .toLowerCase()
          .includes(search)
      )
    })

  return (
    <>

      <table className="order-table">

        <thead>

          <tr>
            <th>Order ID</th>
            <th>Vendor Name</th>
            <th>Supplier Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Requested Date</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredOrders.length >
          0 ? (

            filteredOrders.map(
              order => (

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
                    <span
                     className={`status-badge ${order.status.toLowerCase()}`}
                     >
                    {order.status}
                     </span>
                  </td>

                  <td>
                    {order.date}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        setSelectedOrder(
                          order
                        )
                      }
                    >
                      View
                    </button>

                    {' '}

                    <OrderStatusUpdate
                      order={
                        order
                      }
                      updateStatus={
                        updateStatus
                      }
                    />

                    {' '}

                    <button
                      onClick={() =>
                        cancelOrder(
                          order.id
                        )
                      }
                    >
                      Cancel
                    </button>

                  </td>

                </tr>
              )
            )

          ) : (

            <tr>

              <td
                colSpan="8"
                style={{
                  textAlign:
                    'center',
                  padding:
                    '20px'
                }}
              >
                No Orders Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

      <OrderViewModal
        order={selectedOrder}
        onClose={() =>
          setSelectedOrder(
            null
          )
        }
      />

    </>
  )
}

export default OrderTable