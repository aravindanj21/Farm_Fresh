import React from 'react'

const ReportSummary = ({
  totalOrders,
  completedOrders,
  pendingOrders
}) => {
  return (
    <div className="summary-container">

      <div className="summary-card">
        <h3>Total Orders</h3>
        <p>{totalOrders}</p>
      </div>

      <div className="summary-card">
        <h3>Completed Orders</h3>
        <p>{completedOrders}</p>
      </div>

      <div className="summary-card">
        <h3>Pending Orders</h3>
        <p>{pendingOrders}</p>
      </div>

    </div>
  )
}

export default ReportSummary