import React from 'react'

const NotificationBell = ({
  notifications,
  setShowDropdown
}) => {

  const unreadCount =
    notifications.filter(
      (item) => !item.read
    ).length

  return (
    <div
      onClick={() =>
        setShowDropdown(
          prev => !prev
        )
      }
      style={{
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      🔔

      {unreadCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            background: 'red',
            color: '#fff',
            borderRadius: '50%',
            minWidth: '20px',
            textAlign: 'center',
            fontSize: '12px'
          }}
        >
          {unreadCount}
        </span>
      )}
    </div>
  )
}

export default NotificationBell