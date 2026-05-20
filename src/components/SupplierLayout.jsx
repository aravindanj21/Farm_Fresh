import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const SupplierLayout = ({ children }) => {
  return (
    <div style={styles.container}>
      
      <Sidebar />

      <div style={styles.mainSection}>
        <Navbar />

        <div style={styles.content}>
          {children}
        </div>
      </div>

    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#2869cb'
  },

  mainSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },

  content: {
    padding: '20px'
  }
}

export default SupplierLayout