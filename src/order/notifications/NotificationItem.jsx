import React from 'react'

const NotificationItem = ({
  notification,
  markAsRead
}) => {

  const getIcon = () => {

    switch (
      notification.type
    ) {

      case 'vendor_request':
        return '📦'

      case 'approval':
        return '✅'

      case 'status_change':
        return '🔄'

      case 'low_stock':
        return '⚠️'

      default:
        return '🔔'
    }
  }

  return (
    <div
      onClick={() =>
        markAsRead(
          notification.id
        )
      }
      style={{
        padding: '12px',
        borderBottom:
          '1px solid #ddd',
        background:
          notification.read
            ? '#fff'
            : '#eef7ff'
      }}
    >
      <div>
        {getIcon()} {' '}
        <strong>
          {notification.title}
        </strong>
      </div>

      <div>
        {notification.message}
      </div>

      <small>
        {notification.createdAt}
      </small>
    </div>
  )
}

export default NotificationItem