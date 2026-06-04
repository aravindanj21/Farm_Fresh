import React from 'react'

const ReportFilter = ({
  searchTerm,
  setSearchTerm,
  fromDate,
  setFromDate,
  toDate,
  setToDate
}) => {
  return (
    <div className="filter-container">

      <input
        type="text"
        placeholder="Search Product..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

      <input
        type="date"
        value={fromDate}
        onChange={(e) =>
          setFromDate(e.target.value)
        }
      />

      <input
        type="date"
        value={toDate}
        onChange={(e) =>
          setToDate(e.target.value)
        }
      />

    </div>
  )
}

export default ReportFilter