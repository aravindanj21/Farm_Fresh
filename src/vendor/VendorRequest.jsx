import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const VendorRequest = ({
  orders,
  setOrders
}) => {
  const navigate = useNavigate()

  const [formData, setFormData] =
    useState({
      vendor: '',
      supplier: '',
      product: '',
      quantity: ''
    })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newOrder = {
      id: `ORD${Date.now()}`,
      vendor: formData.vendor,
      supplier:
        formData.supplier,
      product: formData.product,
      quantity:
        Number(
          formData.quantity
        ),
      status: 'Pending',
      date: new Date()
        .toISOString()
        .split('T')[0]
    }

    setOrders((prev) => [
      ...prev,
      newOrder
    ])

    console.log(
      'New Order Added:',
      newOrder
    )

    alert(
      'Vendor Request Submitted Successfully'
    )

    setFormData({
      vendor: '',
      supplier: '',
      product: '',
      quantity: ''
    })

    navigate(
      '/supplier-approval'
    )
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        background: '#fff',
        padding: '25px',
        borderRadius: '10px',
        boxShadow:
          '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}
      >
        Vendor Request Form
      </h2>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <div
          style={{
            marginBottom: '15px'
          }}
        >
          <label>
            Vendor Name
          </label>

          <input
            type="text"
            name="vendor"
            value={
              formData.vendor
            }
            onChange={
              handleChange
            }
            placeholder="Enter Vendor Name"
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px'
            }}
          />
        </div>

        <div
          style={{
            marginBottom: '15px'
          }}
        >
          <label>
            Supplier Name
          </label>

          <input
            type="text"
            name="supplier"
            value={
              formData.supplier
            }
            onChange={
              handleChange
            }
            placeholder="Enter Supplier Name"
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px'
            }}
          />
        </div>

        <div
          style={{
            marginBottom: '15px'
          }}
        >
          <label>
            Product Name
          </label>

          <input
            type="text"
            name="product"
            value={
              formData.product
            }
            onChange={
              handleChange
            }
            placeholder="Enter Product Name"
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px'
            }}
          />
        </div>

        <div
          style={{
            marginBottom: '20px'
          }}
        >
          <label>
            Quantity
          </label>

          <input
            type="number"
            name="quantity"
            value={
              formData.quantity
            }
            onChange={
              handleChange
            }
            placeholder="Enter Quantity"
            required
            min="1"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background:
              '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius:
              '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Submit Request
        </button>
      </form>
    </div>
  )
}

export default VendorRequest