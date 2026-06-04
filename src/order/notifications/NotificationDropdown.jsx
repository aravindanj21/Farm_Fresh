import React from 'react'
import NotificationItem from './NotificationItem'

const NotificationDropdown = ({
  notifications,
  markAsRead,
  markAllAsRead
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: '50px',
        width: '350px',
        background: '#fff',
        borderRadius: '10px',
        boxShadow:
          '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 999
      }}
    >
      <div
        style={{
          padding: '12px',
          display: 'flex',
          justifyContent:
            'space-between',
          borderBottom:
            '1px solid #ddd'
        }}
      >
        <strong>
          Notifications
        </strong>

        <button
          onClick={markAllAsRead}
        >
          Mark All
        </button>
      </div>

      {notifications.length > 0 ? (
        notifications.map(item => (
          <NotificationItem
            key={item.id}
            notification={item}
            markAsRead={markAsRead}
          />
        ))
      ) : (
        <div
          style={{
            padding: '15px'
          }}
        >
          No Notifications
        </div>
      )}
    </div>
  )
}

export default NotificationDropdown