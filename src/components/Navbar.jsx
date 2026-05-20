import React from 'react'

const Navbar = () => {
  return (
    <div>

      <style>{`
        .navbar {
          background: white;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo {
          font-size: 20px;
          font-weight: bold;
          color: #111;
        }

        .profile {
          font-weight: bold;
          color: #333;
          background: #f3f4f6;
          padding: 8px 12px;
          border-radius: 8px;
        }

       
        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 12px 15px;
          }

          .logo {
            font-size: 18px;
          }

          .profile {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .logo {
            font-size: 16px;
          }

          .profile {
            font-size: 13px;
            padding: 6px 10px;
          }
        }
      `}</style>

      <div className="navbar">
        <h2 className="logo">Supplier Dashboard</h2>
        <div className="profile">Welcome Supplier</div>
      </div>

    </div>
  )
}

export default Navbar