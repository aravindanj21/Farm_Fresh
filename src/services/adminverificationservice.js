import axios from "axios";

const API = "http://localhost:8000";

export const getVerifications = async () => {
  const res = await axios.get(
    `${API}/api/admin/supplier-verifications`
  );

  return res.data;
};

export const getVerificationDetails = async (
  supplierId
) => {
  const res = await axios.get(
    `${API}/api/admin/supplier-verification/${supplierId}`
  );

  return res.data;
};

export const getDocuments = async (
  supplierId
) => {
  const res = await axios.get(
    `${API}/api/admin/supplier-verification/${supplierId}/documents`
  );

  return res.data;
};

export const approveSupplier = async (
  supplierId
) => {
  const res = await axios.put(
    `${API}/api/admin/supplier-verification/${supplierId}/approve`
  );

  return res.data;
};

export const rejectSupplier = async (
  supplierId,
  reason
) => {
  const res = await axios.put(
    `${API}/api/admin/supplier-verification/${supplierId}/reject`,
    { reason }
  );

  return res.data;
};

export const requestResubmission = async (
  supplierId
) => {
  const res = await axios.put(
    `${API}/api/admin/supplier-verification/${supplierId}/resubmit`
  );

  return res.data;
};