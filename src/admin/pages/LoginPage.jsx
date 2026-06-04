import React, { useState } from 'react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    if (
      email === 'admin@gmail.com' &&
      password === 'admin123'
    ) {
      localStorage.setItem(
        'adminLoggedIn',
        'true'
      )

      window.location.href =
        '/admin/dashboard'
    } else {
      setError('Invalid Email or Password')
    }
  }

  return (
    <div style={styles.container}>
      <form
        style={styles.loginBox}
        onSubmit={handleLogin}
      >
        <h1 style={styles.title}>
          Admin Login
        </h1>

        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.button}
        >
          Login
        </button>

        
      </form>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'linear-gradient(to right,#1562d7,#1e293b)',
  },

  loginBox: {
    width: 350,
    background: '#fff',
    padding: 35,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    boxShadow:
      '0 10px 25px rgba(0,0,0,0.2)',
  },

  title: {
    textAlign: 'center',
    color: '#0f172a',
    marginBottom: 10,
  },

  input: {
    padding: 12,
    borderRadius: 8,
    border: '1px solid #cbd5e1',
    outline: 'none',
    fontSize: 14,
  },

  button: {
    padding: 12,
    border: 'none',
    borderRadius: 8,
    background: '#1562d7',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 15,
  },

  error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    margin: 0,
  },

}

export default LoginPage