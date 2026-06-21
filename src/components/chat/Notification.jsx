import React from "react";

const Notification = ({
  notification,
  onClose,
}) => {
  if (!notification)
    return null;

  return (
    <div className="notification">

      <div className="notification-icon">
        🔔
      </div>

      <div className="notification-content">

        <strong>
          {notification.title}
        </strong>

        <p>
          {notification.message}
        </p>

      </div>

      <button
        onClick={onClose}
      >
        ✕
      </button>

    </div>
  );
};

export default Notification;