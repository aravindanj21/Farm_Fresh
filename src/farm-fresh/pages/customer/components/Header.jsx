import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("customer");

    alert("Logged out successfully");

    
    navigate("/customer-login");
  };

  return (
    <header className="top-header">
      <div className="logo">
        Farm Fresh
      </div>

      <div className="header-right">
        <span
          onClick={handleLogout}
          style={{ cursor: "pointer", marginRight: "20px" }}
        >
          Logout
        </span>

        <span
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer" }}
        >
          Cart
        </span>
      </div>
    </header>
  );
}

export default Header;