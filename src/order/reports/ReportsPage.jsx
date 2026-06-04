import React, {
  useState,
  useEffect
} from 'react'
import axios from 'axios'

import './reports.css'
import ReportSummary from './ReportSummary'
import ReportFilter from './ReportFilter'
import ReportTable from './ReportTable'

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] =
    useState('')

  const [fromDate, setFromDate] =
    useState('')

  const [toDate, setToDate] =
    useState('')

  const [reports, setReports] =
    useState([])

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        'https://fakestoreapi.com/products'
      )

      const reportData =
        response.data.map(
          (product, index) => ({
            id: `ORD${String(
              index + 1
            ).padStart(3, '0')}`,

            product: product.title,

            quantity:
              Math.floor(
                Math.random() * 20
              ) + 1,

            status: [
              'Pending',
              'Completed',
              'Processing'
            ][index % 3],

            date: `2026-06-${String(
              (index % 28) + 1
            ).padStart(2, '0')}`,

            sales:
              Math.floor(
                product.price * 1000
              )
          })
        )

      setReports(reportData)
    } catch (error) {
      console.log(error)
    }
  }

  const filteredReports =
    reports.filter((report) => {
      const matchesSearch =
        report.product
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

      const matchesDate =
        (!fromDate ||
          report.date >= fromDate) &&
        (!toDate ||
          report.date <= toDate)

      return (
        matchesSearch &&
        matchesDate
      )
    })

  const totalOrders =
    reports.length

  const completedOrders =
    reports.filter(
      (r) =>
        r.status === 'Completed'
    ).length

  const pendingOrders =
    reports.filter(
      (r) =>
        r.status === 'Pending'
    ).length

  const totalSales =
    reports.reduce(
      (sum, item) =>
        sum + item.sales,
      0
    )

  const topProduct =
    reports.length > 0
      ? reports.reduce((prev, curr) =>
          prev.sales > curr.sales
            ? prev
            : curr
        ).product
      : 'N/A'

  const exportReport = () => {
    alert(
      'Report Exported Successfully'
    )
  }

  return (
    <div className="reports-container">
      <h2>Reports Dashboard</h2>

      <ReportSummary
        totalOrders={totalOrders}
        completedOrders={
          completedOrders
        }
        pendingOrders={
          pendingOrders
        }
      />

      <ReportFilter
        searchTerm={searchTerm}
        setSearchTerm={
          setSearchTerm
        }
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      <div className="sales-box">
        <h3>
          Sales Summary : ₹
          {totalSales.toLocaleString()}
        </h3>

        <h4>
          Top Product : {topProduct}
        </h4>

        <button
          onClick={exportReport}
        >
          Export Report
        </button>
      </div>

      <ReportTable
        reports={filteredReports}
      />
    </div>
  )
}

export default ReportsPage