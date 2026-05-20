import React from 'react'

const Vendor = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial'
      }}
    >

      
      <div
        style={{
          width: '220px',
          backgroundColor: '#1e293b',
          color: 'white',
          padding: '20px'
        }}
      >
        <h2>Vendor Panel</h2>

        <ul
          style={{
            listStyle: 'none',
            padding: 0
          }}
        >
          <li
            style={{
              padding: '10px',
              marginTop: '20px',
              backgroundColor: '#334155',
              borderRadius: '5px'
            }}
          >
            Dashboard
          </li>

          <li
            style={{
              padding: '10px',
              marginTop: '10px'
            }}
          >
            Orders
          </li>

          <li
            style={{
              padding: '10px',
              marginTop: '10px'
            }}
          >
            Products
          </li>

          <li
            style={{
              padding: '10px',
              marginTop: '10px',
              backgroundColor: '#dc2626',
              borderRadius: '5px'
            }}
          >
            Logout
          </li>
        </ul>
      </div>

      
      <div
        style={{
          flex: 1,
          backgroundColor: '#ebed68'
        }}
      >

        
        <div
          style={{
            backgroundColor: 'white',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          <h1>Vendor/Vendor Dashboard</h1>

          <span>Welcome Vendor</span>
        </div>

        
        <div
          style={{
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px'
            }}
          >
            <h2>Vendor Page</h2>

            <p>This is vendor dashboard content.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Vendor