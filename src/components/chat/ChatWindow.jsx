import React from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({
  messages,
  currentUser,
}) => {
  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.message_id}
          message={msg}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default ChatWindow;