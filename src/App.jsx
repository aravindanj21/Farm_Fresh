import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SupplierDashboard from './components/SupplierDashboard'




const App = () => {
  return (
  
<BrowserRouter>

      <Routes>

        <Route
          path="/supplier/dashboard"
          element={<SupplierDashboard />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App
