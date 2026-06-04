import React, { useState } from 'react'

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@gmail.com',
    phone: '9876543210',
    role: 'Admin',
    location: 'Tamil Nadu, India',
  })

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    alert('Profile updated successfully!')
  }

  return (
    <div style={styles.container}>
      
      <div style={styles.header}>
        <h2 style={styles.title}>My Profile</h2>
        <p style={styles.subText}>
          Manage your account information
        </p>
      </div>

      <div style={styles.grid}>
       
        <div style={styles.card}>
          <div style={styles.avatar}>
            {profile.name.charAt(0)}
          </div>

          <h3 style={styles.name}>{profile.name}</h3>
          <p style={styles.role}>{profile.role}</p>

          <div style={styles.badge}>Active Account</div>

          <div style={styles.infoBox}>
            <p>📧 {profile.email}</p>
            <p>📞 {profile.phone}</p>
            <p>📍 {profile.location}</p>
          </div>
        </div>

       
        <div style={styles.formCard}>
          <h3 style={styles.sectionTitle}>
            Edit Profile
          </h3>

          <div style={styles.form}>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Name"
              style={styles.input}
            />

            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
              style={styles.input}
            />

            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Phone"
              style={styles.input}
            />

            <input
              name="location"
              value={profile.location}
              onChange={handleChange}
              placeholder="Location"
              style={styles.input}
            />

            <button
              onClick={handleSave}
              style={styles.button}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: 20,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    margin: 0,
    color: '#0f172a',
  },

  subText: {
    color: '#e2e5ea',
    marginTop: 5,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: 20,
  },

  card: {
    background: '#fff',
    borderRadius: 15,
    padding: 20,
    textAlign: 'center',
    boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    background: '#2563eb',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    margin: '0 auto 10px',
  },

  name: {
    margin: 0,
    fontSize: 20,
  },

  role: {
    color: '#64748b',
    marginTop: 5,
  },

  badge: {
    display: 'inline-block',
    marginTop: 10,
    padding: '5px 10px',
    background: '#dcfce7',
    color: '#166534',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
  },

  infoBox: {
    marginTop: 20,
    textAlign: 'left',
    fontSize: 14,
    color: '#334155',
    lineHeight: 1.8,
  },

  formCard: {
    background: '#fff',
    borderRadius: 15,
    padding: 20,
    boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
  },

  sectionTitle: {
    marginBottom: 15,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  input: {
    padding: 12,
    borderRadius: 8,
    border: '1px solid #cbd5e1',
    outline: 'none',
  },

  button: {
    padding: 12,
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}

export default ProfilePage