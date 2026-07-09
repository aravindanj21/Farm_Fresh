import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css";
import { loginCustomer } from "./CustomerService";

function CustomerLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await loginCustomer({
      mobile,
      password,
    });

   
    localStorage.setItem("token", res.access_token);

    
    localStorage.setItem("customer", JSON.stringify(res));

    alert("Login Successful");

    navigate("/customer/dashboard");
  } catch (err) {
    alert(err.response?.data?.detail || "Invalid Mobile Number or Password");
  }
};
  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Customer Login</h2>

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <div className="links">
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <div className="links">
          <a href="/otp-login">Login with OTP</a>
        </div>
      </form>
    </div>
  );
}

export default CustomerLogin;