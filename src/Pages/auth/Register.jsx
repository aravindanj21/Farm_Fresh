
import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    user_id: "",
    name: "",
    role: "",
    email: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Registration</h2>

      <form onSubmit={registerUser}>
        <input
          className="form-control mb-2"
          name="user_id"
          placeholder="User ID"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <select
          className="form-control mb-2"
          name="role"
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="Supplier">Supplier</option>
          <option value="Vendor">Vendor</option>
        </select>

        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
