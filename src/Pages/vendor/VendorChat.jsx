import React, {
  useEffect,
  useState,
  useRef,
} from "react";

import ChatList from "../../components/chat/ChatList";
import ChatWindow from "../../components/chat/ChatWindow";
import MessageInput from "../../components/chat/MessageInput";
import ChatNotification from "../../components/chat/Notification";

import {
  getChats,
  getMessages,
  sendMessage,
} from "../../api/chatApi";

import {
  uploadFile,
} from "../../api/fileApi";

import useSocket from "../../hooks/useSocket";

const VendorChat = ({ currentUser = 1 }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [ringing, setRinging] = useState(false);

 
  const selectedChatRef = useRef(selectedChat);

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  
  useEffect(() => {
    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  
  useSocket(currentUser, (newMessage) => {
    const activeChat = selectedChatRef.current;

    const isActiveChat =
      activeChat &&
      activeChat.chat_id === newMessage.chat_id;

    if (isActiveChat) {
      setMessages((prev) => [...prev, newMessage]);
    } else {
      setUnreadCounts((prev) => ({
        ...prev,
        [newMessage.chat_id]:
          (prev[newMessage.chat_id] || 0) + 1,
      }));
    }

   
    let title = "New Message Received";
    let body = newMessage.message || "You received a message";

    if (newMessage.message_type === "image") {
      title = "Image Received";
      body = "A new image was shared";
    }

    if (
      newMessage.message_type === "pdf" ||
      newMessage.message_type === "file"
    ) {
      title = "File Received";
      body = "A file was shared";
    }

    if (newMessage.message_type === "product") {
      title = "Product Discussion";
      body = newMessage.message;
    }

    setNotification({ title, message: body });

    if (window.Notification && Notification.permission === "granted") {
      new Notification(title, { body });
    }

    setRinging(true);
    setTimeout(() => setRinging(false), 1000);

    setTimeout(() => {
      setNotification(null);
    }, 5000);

    
  });

 
  useEffect(() => {
    loadChats();
  }, []);

  
  useEffect(() => {
    if (selectedChat) {
      loadMessages();

      setUnreadCounts((prev) => ({
        ...prev,
        [selectedChat.chat_id]: 0,
      }));
    }
  }, [selectedChat]);

  const loadChats = async () => {
    try {
      const data = await getChats();
      setChats(data || []);

      if (!selectedChat && data.length > 0) {
        setSelectedChat(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadMessages = async () => {
    if (!selectedChat) return;

    try {
      const data = await getMessages(selectedChat.chat_id);
      setMessages(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async (text, type = "text") => {
    if (!selectedChat || !text.trim()) return;

    try {
      await sendMessage({
        chat_id: selectedChat.chat_id,
        sender_id: currentUser,
        receiver_id: selectedChat.user_id,
        message_type: type,
        message: text,
      });

      loadMessages();
      loadChats();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFile = async (file) => {
    if (!file || !selectedChat) return;

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("chat_id", selectedChat.chat_id);
      formData.append("sender_id", currentUser);
      formData.append("receiver_id", selectedChat.user_id);

      await uploadFile(formData);

      loadMessages();
      loadChats();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);

    setUnreadCounts((prev) => ({
      ...prev,
      [chat.chat_id]: 0,
    }));
  };

  const totalUnread = Object.values(unreadCounts).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <>
      <ChatNotification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <div className="chat-layout">
        <div className="chat-list">
          <div className="chat-header">
            <h3>Chats</h3>

            <div className={`bell-wrapper ${ringing ? "ringing" : ""}`}>
              🔔
              {totalUnread > 0 && (
                <span className="bell-badge">
                  {totalUnread}
                </span>
              )}
            </div>
          </div>

          <ChatList
            chats={chats}
            selectedChat={selectedChat}
            setSelectedChat={handleSelectChat}
            unreadCounts={unreadCounts}
          />
        </div>

        <div className="chat-section">
          <ChatWindow
            messages={messages}
            currentUser={currentUser}
          />

          {selectedChat ? (
            <MessageInput
              onSend={handleSend}
              onFileUpload={handleFile}
            />
          ) : (
            <div style={{ padding: "20px", textAlign: "center" }}>
              Select a Chat
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VendorChat;