import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {

  const menus = [
    'Dashboard',
    'Stock List',
    'Add Product',
    'Vendor Requests',
    'Profile',
    'Logout'
  ]

  return (
    <div style={styles.sidebar}>

      <h2 style={styles.logo}>Supplier</h2>

      {
        menus.map((menu, index) => (
          <Link
            key={index}
            to="#"
            style={
              menu === 'Logout'
                ? styles.logoutMenu
                : styles.menu
            }
          >
            {menu}
          </Link>
        ))
      }

    </div>
  )
}

const styles = {
  sidebar: {
    width: '250px',
    background: '#1e293b',
    color: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },

  logo: {
    marginBottom: '30px'
  },

  menu: {
    color: 'white',
    textDecoration: 'none',
    padding: '12px',
    borderRadius: '8px',
    background: '#334155'
  },

  logoutMenu: {
    color: 'white',
    textDecoration: 'none',
    padding: '12px',
    borderRadius: '8px',
    background: '#dc2626' 
  }
}

export default Sidebar