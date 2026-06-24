import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/login",
        {
          email,
          password,
        }
      );

      console.log("Login Response:", res.data);

      localStorage.setItem(
        "user_id",
        res.data.user_id
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      if (res.data.access_token) {
        localStorage.setItem(
          "access_token",
          res.data.access_token
        );
      }

      alert("Login Successful");

      if (res.data.role === "admin") {
        window.location.href =
          "/admin/supplier-verifications";
      } else if (
        res.data.role === "supplier"
      ) {
        window.location.href =
          "/supplier-dashboard";
      } else {
        alert("Unknown User Role");
      }

    } catch (error) {
      console.error("Login Error:", error);

      alert(
        error.response?.data?.detail ||
        "Login Failed"
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          style={styles.form}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
            required
          />

          <button
            type="submit"
            style={styles.button}
          >
            Login
          </button>
        </form>

        <p style={styles.text}>
          Don't have an account?
          <a
            href="/supplier-register"
            style={styles.link}
          >
            Register
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
    border: "1px solid #ddd",
    borderRadius: "8px",
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

  text: {
    textAlign: "center",
    marginTop: "15px",
  },

  link: {
    marginLeft: "5px",
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Login;