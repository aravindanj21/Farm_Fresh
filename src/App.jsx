import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import OrderManagement from './order/OrderManagement'
import ReportsPage from './order/reports/ReportsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <Navigate to="/orders" />
          }
        />

        <Route
          path="/orders"
          element={
            <OrderManagement />
          }
        />

        <Route
          path="/reports"
          element={
            <ReportsPage />
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App

