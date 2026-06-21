import api from "./axios";

export const uploadFile = async (formData) => {
  const res = await api.post(
    "/api/files/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};