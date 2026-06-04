import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()

  const menus = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Suppliers', path: '/admin/suppliers' },
    { name: 'Vendors', path: '/admin/vendors' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Stock Monitoring', path: '/admin/stock-monitoring' },
    { name: 'Profile', path: '/admin/profile' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    navigate('/login')
  }

  return (
    <div style={styles.sidebar}>
   
      <div style={styles.logoSection}>
        <div style={styles.logoCircle}>A</div>
        <h2 style={styles.logoText}>Admin Panel</h2>
      </div>

     
      <div style={styles.menuContainer}>
        {menus.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.path}
            style={({ isActive }) => ({
              ...styles.link,
              background: isActive ? '#334155' : 'transparent',
              color: isActive ? '#fff' : '#cbd5e1',
            })}
          >
            {menu.name}
          </NavLink>
        ))}
      </div>

     
      <button style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

const styles = {
  sidebar: {
    width: 260,
    background: '#0f172a',
    color: '#fff',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },

  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
  },

  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },

  logoText: {
    fontSize: 18,
    margin: 0,
  },

  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    flex: 1,
  },

  link: {
    padding: '12px 14px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: '500',
    transition: '0.3s',
  },

  logoutBtn: {
    marginTop: 'auto',
    padding: 12,
    border: 'none',
    borderRadius: 8,
    background: '#ef4444',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}

export default Sidebar