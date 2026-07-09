import axios from "axios";

const API = "http://127.0.0.1:8000/api/customer";

export const registerCustomer = async (data) => {
  const response = await axios.post(`${API}/register`, data);
  return response.data;
};

export const loginCustomer = async (data) => {
  const response = await axios.post(`${API}/login`, data);
  return response.data;
};

export const sendOTP = async (data) => {
  const res = await axios.post(`${API}/send-otp`, data);
  return res.data;
};

export const verifyOTP = async (data) => {
  const res = await axios.post(`${API}/verify-otp`, data);
  return res.data;
};

export const sendForgotOTP = async (data) => {
  const response = await axios.post(`${API}/forgot-password`, data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axios.post(`${API}/reset-password`, data);
  return response.data;
};