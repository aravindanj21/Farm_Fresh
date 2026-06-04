import React, { useState } from 'react'
import VendorLayout from '../components/VendorLayout'

const VendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Sita',
    email: 'sita@gmail.com',
    phone: '9876543210',
    shopName: 'Lakshmi Groups',
    address: 'Chennai, Tamil Nadu',
    gst: '33ABCDE1234F1Z5'
  })

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  return (
    <VendorLayout>
      <div style={styles.page}>

        
        <div style={styles.header}>
          <h2>Vendor Profile</h2>

          <button
            onClick={() => setIsEditing(!isEditing)}
            style={styles.editBtn}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        
        <div style={styles.grid}>

          
          <div style={styles.leftCard}>
            <div style={styles.avatar}>
              {profile.name.charAt(0)}
            </div>

            <h3>{profile.name}</h3>
            <p style={{ color: '#777' }}>{profile.email}</p>

            <div style={styles.badge}>Vendor Account</div>

            <button style={styles.uploadBtn}>
              Upload Photo
            </button>
          </div>

         
          <div style={styles.rightSection}>

            <div style={styles.card}>
              <h4>Personal Info</h4>

              <div style={styles.row}>
                <span>Name</span>
                {isEditing ? (
                  <input name="name" value={profile.name} onChange={handleChange} />
                ) : (
                  <b>{profile.name}</b>
                )}
              </div>

              <div style={styles.row}>
                <span>Phone</span>
                {isEditing ? (
                  <input name="phone" value={profile.phone} onChange={handleChange} />
                ) : (
                  <b>{profile.phone}</b>
                )}
              </div>

              <div style={styles.row}>
                <span>Email</span>
                <b>{profile.email}</b>
              </div>
            </div>

            <div style={styles.card}>
              <h4>Business Info</h4>

              <div style={styles.row}>
                <span>Shop Name</span>
                {isEditing ? (
                  <input name="shopName" value={profile.shopName} onChange={handleChange} />
                ) : (
                  <b>{profile.shopName}</b>
                )}
              </div>

              <div style={styles.row}>
                <span>Address</span>
                {isEditing ? (
                  <input name="address" value={profile.address} onChange={handleChange} />
                ) : (
                  <b>{profile.address}</b>
                )}
              </div>

              <div style={styles.row}>
                <span>GST</span>
                <b>{profile.gst}</b>
              </div>
            </div>

            {isEditing && (
              <button style={styles.saveBtn}>
                Save Changes
              </button>
            )}

          </div>
        </div>

      </div>
    </VendorLayout>
  )
}

const styles = {

  page: {
    padding: 20,
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #3c4b7a, #fdf4ff)'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  editBtn: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 600
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    gap: 20
  },

  leftCard: {
    background: 'linear-gradient(180deg, #1e1b4b, #312e81)',
    color: '#fff',
    padding: 20,
    borderRadius: 16,
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    height: 'fit-content'
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #f472b6, #a78bfa)',
    color: '#fff',
    fontSize: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 10px',
    fontWeight: 'bold'
  },

  badge: {
    marginTop: 10,
    padding: '6px 12px',
    background: 'rgba(255,255,255,0.15)',
    color: '#fff',
    borderRadius: 20,
    fontSize: 12,
    display: 'inline-block'
  },

  uploadBtn: {
    marginTop: 15,
    padding: '8px 12px',
    border: 'none',
    background: '#6366f1',
    color: '#fff',
    borderRadius: 10,
    cursor: 'pointer'
  },

  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15
  },

  card: {
    background: '#fff',
    padding: 20,
    borderRadius: 16,
    boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
    border: '1px solid #f1f5f9'
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #f1f1f1',
    color: '#111827'
  },

  saveBtn: {
    marginTop: 10,
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    width: 160,
    fontWeight: 600
  }
}

export default VendorProfile