import React from "react";

const MessageBubble = ({
  message,
  currentUser,
}) => {
  const own =
    message.sender_id === currentUser;

  return (
    <div
      className={`message-row ${
        own ? "own" : ""
      }`}
    >
      <div className="message-bubble">

       
        {message.message_type ===
          "text" && (
          <p>{message.message}</p>
        )}

        
        {message.message_type ===
          "product" && (
          <div className="product-card">

            <h4>
              Product Discussion
            </h4>

            <p>
              {message.message}
            </p>

          </div>
        )}

        
        {message.message_type ===
          "image" && (
          <div>
            <img
              src={message.file_url}
              alt="Shared"
              width="200"
              style={{
                borderRadius: "8px",
                maxWidth: "100%",
              }}
            />
          </div>
        )}

        
        {message.message_type ===
          "pdf" && (
          <div>
            <a
              href={message.file_url}
              target="_blank"
              rel="noreferrer"
            >
              📄 View PDF File
            </a>
          </div>
        )}

        
        {message.message_type ===
          "file" && (
          <div>
            <a
              href={message.file_url}
              target="_blank"
              rel="noreferrer"
            >
              📎 Download File
            </a>
          </div>
        )}

        
        <small
          style={{
            display: "block",
            marginTop: "6px",
          }}
        >
          {message.created_at}
        </small>

        
        <div
          style={{
            fontSize: "12px",
            color: "#666",
            marginTop: "4px",
          }}
        >
          {message.status ===
            "read" && "✓✓ Read"}

          {message.status ===
            "delivered" &&
            "✓✓ Delivered"}

          {message.status ===
            "sent" &&
            "✓ Sent"}
        </div>

      </div>
    </div>
  );
};

export default MessageBubble;