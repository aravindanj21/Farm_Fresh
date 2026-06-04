import React from 'react'

const OrderStatusUpdate = ({
  order,
  updateStatus
}) => {

  const getNextStatuses = (status) => {

    switch (status) {

      case 'Pending':
        return [
          'Approved',
          'Rejected'
        ]

      case 'Approved':
        return [
          'Processing'
        ]

      case 'Processing':
        return [
          'Completed'
        ]

      case 'Rejected':
        return []

      case 'Completed':
        return []

      default:
        return []
    }
  }

  const nextStatuses =
    getNextStatuses(order.status)

  return (
    <select
      onChange={(e) =>
        updateStatus(
          order.id,
          e.target.value
        )
      }
      defaultValue=""
      disabled={
        nextStatuses.length === 0
      }
    >
      <option value="">
        Update Status
      </option>

      {nextStatuses.map(
        (status) => (
          <option
            key={status}
            value={status}
          >
            {status}
          </option>
        )
      )}
    </select>
  )
}

export default OrderStatusUpdate