import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/customer-home">Home</Link>

      <Link to="/categories">Categories</Link>

      <Link to="/products">Products</Link>

      <Link to="/offers">Offers</Link>

      <Link to="/contact">Contact</Link>

      <Link to="/cart">🛒 Cart</Link>
    </nav>
  );
}

export default Navbar;