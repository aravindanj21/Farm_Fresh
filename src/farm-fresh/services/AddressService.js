import axios from "axios";

const API = "http://127.0.0.1:8000/api/address";

export const addAddress = (data)=>
    axios.post(`${API}/add`,data);

export const getAddresses = (customerId)=>
    axios.get(`${API}/${customerId}`);

export const updateAddress = (data)=>
    axios.put(`${API}/update`,data);

export const deleteAddress = (id)=>
    axios.delete(`${API}/${id}`);

export const setDefaultAddress = (customerId,addressId)=>
    axios.put(`${API}/default`,{
        customer_id:customerId,
        address_id:addressId
    });