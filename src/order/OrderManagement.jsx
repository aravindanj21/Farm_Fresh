import React, {
  useState,
  useEffect
} from 'react'

import axios from 'axios'

import './order.css'

import OrderSearch from './OrderSearch'
import OrderTable from './OrderTable'

import NotificationBell from './notifications/NotificationBell'
import NotificationDropdown from './notifications/NotificationDropdown'

const OrderManagement = () => {

  const [orders, setOrders] =
    useState([])

  const [searchTerm, setSearchTerm] =
    useState('')

  const [showDropdown, setShowDropdown] =
    useState(false)

  const [notifications, setNotifications] =
    useState([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {

    try {

      const response =
        await axios.get(
          'https://fakestoreapi.com/products'
        )

      const generatedOrders =
        response.data.map(
          (product, index) => ({
            id: `ORD${String(
              index + 1
            ).padStart(3, '0')}`,

            vendor:
              `Vendor ${index + 1}`,

            supplier:
              `Supplier ${index + 1}`,

            product:
              product.title,

            quantity:
              Math.floor(
                Math.random() * 10
              ) + 1,

            stock:
              Math.floor(
                Math.random() * 10
              ),

            status: 'Pending',

            date:
              new Date()
                .toISOString()
                .split('T')[0]
          })
        )

      setOrders(generatedOrders)

      generatedOrders.forEach(
        order => {

          if (
            order.stock <= 5
          ) {

            addNotification(
              'Low Stock Alert',
              `${order.product} stock is low`,
              'low_stock'
            )
          }
        }
      )

    } catch (error) {

      console.log(error)
    }
  }

  const addNotification = (
    title,
    message,
    type
  ) => {

    const newNotification = {
      id: Date.now(),
      title,
      message,
      type,
      read: false,
      createdAt:
        new Date().toLocaleString()
    }

    setNotifications(
      prev => [
        newNotification,
        ...prev
      ]
    )
  }

  const markAsRead = (
    id
  ) => {

    setNotifications(
      notifications.map(
        item =>
          item.id === id
            ? {
                ...item,
                read: true
              }
            : item
      )
    )
  }

  const markAllAsRead = () => {

    setNotifications(
      notifications.map(
        item => ({
          ...item,
          read: true
        })
      )
    )
  }

  const createVendorRequest = () => {

    addNotification(
      'New Vendor Request',
      'Vendor requested Laptop',
      'vendor_request'
    )
  }

  const supplierApproval = (
    orderId
  ) => {

    addNotification(
      'Supplier Approval',
      `Order ${orderId} approved`,
      'approval'
    )
  }

  const orderStatusChanged = (
    orderId,
    status
  ) => {

    addNotification(
      'Order Status Changed',
      `Order ${orderId} changed to ${status}`,
      'status_change'
    )
  }

  return (
  <div className="order-container">

   
    <div className="order-header">

      <h2> Order Management</h2>

      <div
        style={{
          position: 'relative'
        }}
      >
        <NotificationBell
          notifications={notifications}
          setShowDropdown={setShowDropdown}
        />

        {showDropdown && (
          <NotificationDropdown
            notifications={notifications}
            markAsRead={markAsRead}
            markAllAsRead={markAllAsRead}
          />
        )}
      </div>

    </div>

    
    <div className="action-buttons">

      <button
        onClick={createVendorRequest}
      >
        Vendor Request
      </button>

      <button
        onClick={() =>
          supplierApproval('ORD001')
        }
      >
         Supplier Approval
      </button>

      <button
        onClick={() =>
          orderStatusChanged(
            'ORD001',
            'Completed'
          )
        }
      >
        Status Change
      </button>

    </div>

   
    <OrderSearch
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />

    
    <OrderTable
      orders={orders}
      setOrders={setOrders}
      searchTerm={searchTerm}
      addNotification={addNotification}
    />

  </div>
)
}

export default OrderManagement