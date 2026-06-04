import React from 'react'

const ReportTable = ({ reports }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="report-table">

        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Date</th>
            <th>Sales</th>
          </tr>
        </thead>

        <tbody>

          {reports.length > 0 ? (

            reports.map((report) => (

              <tr key={report.id}>

                <td>{report.id}</td>

                <td>{report.product}</td>

                <td>{report.quantity}</td>

                <td
                  className={`status-${report.status.toLowerCase()}`}
                >
                  {report.status}
                </td>

                <td>{report.date}</td>

                <td>
                  ₹{report.sales.toLocaleString()}
                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: 'center',
                  padding: '20px'
                }}
              >
                No Reports Found
              </td>
            </tr>

          )}

        </tbody>

      </table>
    </div>
  )
}

export default ReportTable