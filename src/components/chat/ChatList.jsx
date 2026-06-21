import React from "react";

const ChatList = ({
  chats,
  selectedChat,
  setSelectedChat,
  unreadCounts = {},
}) => {
  const handleChatClick = (
    chat
  ) => {
    setSelectedChat(chat);
  };

  const totalUnread =
    Object.values(
      unreadCounts
    ).reduce(
      (a, b) => a + b,
      0
    );

  return (
    <div className="chat-list">

      
      <div className="chat-header">

        <h2>Chats</h2>

        <div className="notification-bell">
          🔔

          {totalUnread > 0 && (
            <span className="bell-count">
              {totalUnread}
            </span>
          )}
        </div>

      </div>

      
      {chats.length === 0 ? (
        <div className="empty-chat">
          No Chats Available
        </div>
      ) : (
        chats.map((chat) => (
          <div
            key={chat.chat_id}
            className={`chat-item ${
              selectedChat?.chat_id ===
              chat.chat_id
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleChatClick(chat)
            }
          >

            
            {chat.unread_count >
              0 && (
              <span className="badge">
                {
                  chat.unread_count
                }
              </span>
            )}

            
            <div className="chat-user">
              <strong>
                {chat.user_name}
              </strong>
            </div>

            
            <div className="business-name">
              {chat.business_name}
            </div>

           
            <div className="chat-middle">
              <small>
                {chat.last_message ||
                  "No messages yet"}
              </small>
            </div>

            
            <div className="chat-footer">
              <span>
                {chat.last_message_time}
              </span>
            </div>

          </div>
        ))
      )}

    </div>
  );
};

export default ChatList;