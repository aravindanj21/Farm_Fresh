import React from 'react'
import SupplierLayout from './SupplierLayout'
import SummaryCard from './SummaryCard'
import ProductTable from './ProductTable'

const SupplierDashboard = () => {
  return (
    <SupplierLayout>

      <div style={styles.container}>

        <div style={styles.cards}>

          <SummaryCard
            title="Total Products"
            value="200"
          />

          <SummaryCard
            title="Overall Stock"
            value="3000"
          />

          <SummaryCard
            title="Pending Requests"
            value="20"
          />

          <SummaryCard
            title="Recent Activity"
            value="30"
          />

        </div>

        <div style={styles.tableWrapper}>
          <ProductTable />
        </div>

      </div>

    </SupplierLayout>
  )
}

const styles = {
  container: {
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    overflowX: 'hidden'
  },

  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    width: '100%',
    marginBottom: '25px'
  },

  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  }
}

export default SupplierDashboard