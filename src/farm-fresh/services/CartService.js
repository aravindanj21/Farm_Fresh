import axios from "axios";

const API = "http://127.0.0.1:8000/api/cart";

export const addToCart = (data) =>
  axios.post(`${API}/add`, data);

export const getCart = (customerId) =>
  axios.get(`${API}/${customerId}`);

export const updateCart = (data) =>
  axios.put(`${API}/update`, data);

export const removeCartItem = (cartId) =>
  axios.delete(`${API}/${cartId}`);