import React, { useState } from "react";
import axios from "axios";

const SupplierRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/register",
        {
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          password: form.password,
          role: "supplier",
        }
      );

      alert("Supplier Registered Successfully");

      setForm({
        name: "",
        email: "",
        mobile: "",
        password: "",
      });

      window.location.href =
        "/login";

    } catch (error) {

  console.log("FULL ERROR:", error);

  console.log(
    "RESPONSE:",
    error.response
  );

  console.log(
    "DATA:",
    error.response?.data
  );

  alert(
    JSON.stringify(
      error.response?.data
    )
  );
}
};

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Supplier Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button
            type="submit"
            style={styles.button}
          >
            Register
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account?
          <a href="/supplier-login">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#4f46e5,#7c3aed)",
  },

  card: {
    width: "400px",
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.15)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },

  loginText: {
    marginTop: "15px",
    textAlign: "center",
  },
};

export default SupplierRegister;
