import { useNavigate } from "react-router-dom";
import "./CustomerNavbar.css";

function CustomerNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("customer");
    navigate("/customer-login");
  };

  return (
    <header className="customer-navbar">
      <h2>Farm Fresh</h2>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </header>
  );
}

export default CustomerNavbar;