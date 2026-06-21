import api from "./axios";

export const getChats = async () => {
  const res = await api.get("/api/chats");
  return res.data;
};

export const getMessages = async (chatId) => {
  const res = await api.get(`/api/messages/${chatId}`);
  return res.data;
};

export const sendMessage = async (data) => {
  const res = await api.post("/api/messages/send", data);
  return res.data;
};