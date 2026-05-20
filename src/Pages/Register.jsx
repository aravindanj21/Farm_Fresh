import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    password: '',
    location: '',
    businessName: '',
    businessType: '',
    role: 'supplier'
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async () => {
    if (!form.name || !form.mobile || !form.password) {
      alert('Please fill required fields')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (response.ok) {
        alert('Registration Successful')
        navigate('/')
      } else {
        alert(data.error || 'Registration failed')
      }

    } catch (error) {
      alert('Server not responding')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Register</h2>

       
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          style={styles.input}
        />

        
        <input
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
          style={styles.input}
        />

       
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="role"
          onChange={handleChange}
          style={styles.input}
          value={form.role}
        >
          <option value="supplier">Supplier</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>

        
        {form.role !== 'admin' && (
          <>
            <input
              name="location"
              placeholder="Location"
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="businessName"
              placeholder="Business Name"
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="businessType"
              placeholder="Business Type"
              onChange={handleChange}
              style={styles.input}
            />
          </>
        )}

        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>

        <p style={{ marginTop: '10px' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/')}
            style={{ color: 'blue', cursor: 'pointer' }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #d4fc79, #96e6a1)',
    fontFamily: 'Inter, Arial',
    boxSizing: 'border-box'
  },

  box: {
    width: '380px',
    padding: '28px',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
    textAlign: 'center',
    boxSizing: 'border-box'
  },

  input: {
    width: '100%',
    padding: '12px',
    marginTop: '10px',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    outline: 'none',
    fontSize: '14px',
    boxSizing: 'border-box',
    transition: '0.2s'
  },

  button: {
    width: '100%',
    padding: '12px',
    marginTop: '15px',
    background: '#095d03',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px'
  }
}


export default Register