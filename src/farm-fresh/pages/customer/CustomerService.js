import axios from "axios";

const API_URL = "https://farmfresh-production-6db2.up.railway.app/api/customer";



export const registerCustomer = async (data) => {
  const response = await axios.post(`${API}/register`, data);
  return response.data;
};

export const loginCustomer = async (data) => {
  const response = await axios.post(`${API}/login`, data);
  return response.data;
};

export const sendOTP = async (data) => {
  const response = await axios.post(`${API}/send-otp`, data);
  return response.data;
};

export const verifyOTP = async (data) => {
  const response = await axios.post(`${API}/verify-otp`, data);
  return response.data;
};

export const sendForgotOTP = async (data) => {
  const response = await axios.post(`${API}/forgot-password`, data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axios.post(`${API}/reset-password`, data);
  return response.data;
};



export const searchProducts = async (keyword) => {
  const response = await axios.get(`${API}/search`, {
    params: { keyword },
  });

  return response.data.products;
};