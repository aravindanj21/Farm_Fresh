const BASE_URL = "http://localhost:8000";

export const sendVendorRequest = async (payload) => {
  const response = await fetch(
    `${BASE_URL}/vendor-request`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return response.json();
};

export const approveOrder = async (orderId) => {
  const response = await fetch(
    `${BASE_URL}/approve-order/${orderId}`,
    {
      method: "PUT",
    }
  );

  return response.json();
};

export const registerUser = async (payload) => {
  const response = await fetch(
    `${BASE_URL}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return response.json();
};