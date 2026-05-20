import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [step, setStep] = useState(1)

  const users = [
    { mobile: '1111111111', password: 'admin123', role: 'admin' },
    { mobile: '2222222222', password: 'supplier123', role: 'supplier' },
    { mobile: '3333333333', password: 'vendor123', role: 'vendor' }
  ]

  const sendOtp = () => {
    const user = users.find(
      u => u.mobile === mobile && u.password === password
    )

    if (!user) {
      alert('Invalid mobile or password')
      return
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString()

    setGeneratedOtp(otpCode)
    setStep(2)

    alert(`Your OTP is: ${otpCode}`)
  }

  const verifyOtp = () => {
    const user = users.find(u => u.mobile === mobile)

    if (otp === generatedOtp) {
      alert('Login Success')

      if (user.role === 'admin') navigate('/dashboard')
      else if (user.role === 'supplier') navigate('/supplier')
      else navigate('/vendor')
    } else {
      alert('Invalid OTP')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Login</h2>
        <p style={styles.subtitle}>OTP + Password Authentication</p>

        {step === 1 && (
          <>
            <input
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <button onClick={sendOtp} style={styles.button}>
              Send OTP
            </button>

            <p style={styles.text}>
              New User?{' '}
              <span
                onClick={() => navigate('/register')}
                style={styles.link}
              >
                Register
              </span>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
            />

            <button onClick={verifyOtp} style={styles.button}>
              Verify OTP
            </button>
          </>
        )}
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
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    fontFamily: 'Inter, Arial',
    boxSizing: 'border-box'
  },

  box: {
    width: '360px',
    padding: '32px',
    borderRadius: '16px',
    textAlign: 'center',
    background: '#ffffff',
    boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
    boxSizing: 'border-box'
  },

  title: {
    marginBottom: '6px',
    color: '#111827',
    fontSize: '22px',
    fontWeight: '700'
  },

  subtitle: {
    fontSize: '13px',
    marginBottom: '18px',
    color: '#6b7280'
  },

  input: {
    width: '100%',
    padding: '12px',
    marginTop: '12px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    outline: 'none',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    transition: '0.2s ease'
  },

  button: {
    width: '100%',
    padding: '12px',
    marginTop: '15px',
    background: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px'
  },

  text: {
    marginTop: '14px',
    fontSize: '13px',
    color: '#374151'
  },

  link: {
    color: '#2563eb',
    cursor: 'pointer',
    fontWeight: '600'
  }
}
   



export default Login