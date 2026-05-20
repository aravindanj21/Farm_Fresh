import React from 'react'

const Dashboard = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#ebed68'
      }}
    >

      
      <div
        style={{
          width: '250px',
          backgroundColor: '#03183f',
          color: 'white',
          padding: '20px'
        }}
      >
        <h2
          style={{
            marginBottom: '30px',
            fontSize: '28px'
          }}
        >
          Admin Panel
        </h2>

        <ul
          style={{
            listStyle: 'none',
            padding: 0
          }}
        >
          <li
            style={{
              padding: '12px',
              marginBottom: '10px',
              backgroundColor: '#334155',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Dashboard
          </li>

          <li
            style={{
              padding: '12px',
              marginBottom: '10px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Suppliers
          </li>

          <li
            style={{
              padding: '12px',
              marginBottom: '10px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Vendors
          </li>

          <li
            style={{
              padding: '12px',
              marginBottom: '10px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Settings
          </li>

          <li
            style={{
              padding: '12px',
              backgroundColor: '#dc2626',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Logout
          </li>
        </ul>
      </div>

      
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >

        <div
          style={{
            backgroundColor: 'white',
            padding: '15px 25px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '26px'
            }}
          >
            Admin/Admin Dashboard
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>Admin</span>

           
          </div>
        </div>

        
        <div
          style={{
            padding: '30px'
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <h2>Dashboard Content</h2>

            <p>
              This is your admin dashboard page.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard