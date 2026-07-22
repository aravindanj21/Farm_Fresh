import axios from "axios";

const API = "http://127.0.0.1:8000/api/orders";

export const placeOrder = (data) => {
    return axios.post(`${API}/place`, data);
};