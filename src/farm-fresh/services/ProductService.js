import axios from "axios";

const API_URL = "https://farmfresh-production-6db2.up.railway.app/api/customer/products";

export const getProductsByCategory = async (categoryId) => {
  const response = await axios.get(`${API_URL}/category/${categoryId}`);
  return response.data.products;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getRelatedProducts = async (id) => {
  const response = await axios.get(`${API_URL}/${id}/related`);
  return response.data.products;
};

export const getSimilarProducts = async (id) => {
  const response = await axios.get(`${API_URL}/${id}/similar`);
  return response.data.products;
};