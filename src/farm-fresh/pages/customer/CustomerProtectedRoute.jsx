import { Navigate } from "react-router-dom";

function CustomerProtectedRoute({ children }) {
  
  const token = localStorage.getItem("token");

  
  const customer = localStorage.getItem("customer");

  
  if (!token || !customer) {
    return <Navigate to="/customer-login" replace />;
  }
 
  return children;
}

export default CustomerProtectedRoute;