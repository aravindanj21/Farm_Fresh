import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./CustomerRegister.css";
import { registerCustomer } from "./CustomerService";


function CustomerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    location: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await registerCustomer(formData);

      alert(
        `Registration Successful!\nCustomer ID : ${response.customer_id}`
      );

      navigate("/customer-login");
    } catch (error) {
      alert(error.response?.data?.detail || "Registration Failed");
    }
  };

  return (
    <div className="customer-register">
      <form onSubmit={handleSubmit} className="register-box">
        <h2>Farm Fresh Customer Registration</h2>

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Village / Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Register
        </button>
        <div className="login-link">
  Already registered?{" "}
  <Link to="/customer-login">Login</Link>
</div>
      </form>
    </div>
  );
}

export default CustomerRegister;