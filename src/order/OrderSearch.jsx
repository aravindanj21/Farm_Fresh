import React from 'react'

const OrderSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search Orders..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-box"
    />
  )
}

export default OrderSearch