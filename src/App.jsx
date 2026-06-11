import React from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./pages/AppRoutes";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">

        <Navbar />

        <div className="main-layout">

          <Sidebar />

          <div className="content-area">
            <AppRoutes />
          </div>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;