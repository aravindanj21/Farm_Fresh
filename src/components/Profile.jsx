import React, { useState } from 'react'
import SupplierLayout from './SupplierLayout'

const Profile = () => {

  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordBox, setShowPasswordBox] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Supplier Name',
    email: 'supplier@gmail.com',
    phone: '+91 9876543210',
    location: 'Tamil Nadu',
    role: 'Vendor Supplier',
    company: 'Jothi Groups',
    experience: '5 Years'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    setIsEditing(false)
    alert('Profile Updated Successfully')
  }

  const updatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    alert('Password Changed Successfully')

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    setShowPasswordBox(false)
  }

  const styles = {

    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      padding: '15px',
      background: '#f1f5f9'
    },

    profileCard: {
      width: '100%',
      maxWidth: '550px',  
      background: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 6px 18px rgba(0,0,0,0.10)'
    },

    topSection: {
      background: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
      padding: '20px',    
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },

    avatar: {
      width: '90px',
      height: '90px',
      borderRadius: '50%',
      background: 'white',
      color: '#1e3a8a',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '35px',
      fontWeight: 'bold',
      border: '4px solid rgba(255,255,255,0.4)'
    },

    supplierName: {
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: '4px'
    },

    role: {
      fontSize: '14px',
      opacity: 0.9
    },

    body: {
      padding: '18px'   
    },

    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#0f172a',
      marginBottom: '12px'
    },

    infoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px'
    },

    infoBox: {
      background: '#f8fafc',
      padding: '10px',  
      borderRadius: '10px',
      border: '1px solid #e2e8f0'
    },

    label: {
      fontSize: '12px',
      color: '#64748b',
      marginBottom: '4px'
    },

    value: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#0f172a'
    },

    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '6px',
      border: '1px solid #cbd5e1',
      fontSize: '13px',
      outline: 'none'
    },

    buttonSection: {
      marginTop: '18px',
      display: 'flex',
      gap: '10px'
    },

    editBtn: {
      padding: '10px 14px',
      background: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '13px'
    },

    passwordBtn: {
      padding: '10px 14px',
      background: '#e2e8f0',
      color: '#0f172a',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '13px'
    },

    saveBtn: {
      padding: '10px 14px',
      background: '#16a34a',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '13px'
    },

    passwordBox: {
      marginTop: '18px',
      background: '#f8fafc',
      padding: '15px',
      borderRadius: '12px',
      border: '1px solid #cbd5e1'
    }

  }

  return (

    <SupplierLayout>

      <div style={styles.container}>

        <div style={styles.profileCard}>

          
          <div style={styles.topSection}>

            <div style={styles.avatar}>
              {profile.name.charAt(0)}
            </div>

            <div>
              <div style={styles.supplierName}>
                {profile.name}
              </div>
              <div style={styles.role}>
                {profile.role}
              </div>
            </div>

          </div>

         
          <div style={styles.body}>

            <div style={styles.sectionTitle}>
              Profile Information
            </div>

            <div style={styles.infoGrid}>

              {Object.keys(profile).map((key) => (
                <div style={styles.infoBox} key={key}>
                  <div style={styles.label}>{key.toUpperCase()}</div>

                  {isEditing ? (
                    <input
                      type="text"
                      name={key}
                      value={profile[key]}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  ) : (
                    <div style={styles.value}>{profile[key]}</div>
                  )}
                </div>
              ))}

            </div>

            
            <div style={styles.buttonSection}>

              {isEditing ? (
                <button style={styles.saveBtn} onClick={handleSave}>
                  Save
                </button>
              ) : (
                <button style={styles.editBtn} onClick={() => setIsEditing(true)}>
                  Edit
                </button>
              )}

              <button
                style={styles.passwordBtn}
                onClick={() => setShowPasswordBox(!showPasswordBox)}
              >
                Password
              </button>

            </div>

            
            {showPasswordBox && (
              <div style={styles.passwordBox}>

                <div style={styles.sectionTitle}>Change Password</div>

                <input
                  type="password"
                  placeholder="Current Password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  style={{ ...styles.input, marginBottom: '10px' }}
                />

                <input
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  style={{ ...styles.input, marginBottom: '10px' }}
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  style={{ ...styles.input, marginBottom: '10px' }}
                />

                <button style={styles.saveBtn} onClick={updatePassword}>
                  Update
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </SupplierLayout>
  )
}

export default Profile