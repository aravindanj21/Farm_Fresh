import axios from "axios";

const API = "http://localhost:8000";


export const submitVerification = async (formData) => {
  const res = await axios.post(
    `${API}/api/supplier/verification`,
    formData
  );

  return res.data;
};


export const getVerificationStatus = async (supplierId) => {
  const res = await axios.get(
    `${API}/api/supplier/verification/status/${supplierId}`
  );

  return res.data;
};


export const getDocuments = async (supplierId) => {
  const res = await axios.get(
    `${API}/api/supplier/verification/documents/${supplierId}`
  );

  return res.data;
};