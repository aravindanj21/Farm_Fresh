import React from 'react'

const SummaryCard = ({ title, value }) => {
  return (
    <div style={styles.card}>

      <h3 style={styles.title}>{title}</h3>

      <h1 style={styles.value}>{value}</h1>

    </div>
  )
}

const styles = {
  card: {
    background: '#47c639',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
    width: '100%',
    minHeight: '140px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: '0.3s'
  },

  title: {
    margin: 0,
    fontSize: '18px',
    color: '#fff',
    wordBreak: 'break-word'
  },

  value: {
    marginTop: '15px',
    fontSize: '32px',
    color: '#fff'
  }
}

export default SummaryCard