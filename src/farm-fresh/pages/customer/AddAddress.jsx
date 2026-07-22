import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddAddress.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { addAddress } from "../../services/AddressService";

function AddAddress() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    mobile: "",
    street: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async (e) => {
    e.preventDefault();

    try {
      const customer = JSON.parse(localStorage.getItem("customer"));

      await addAddress({
        customer_id: customer.id,
        full_name: form.full_name,
        mobile: form.mobile,
        street: form.street,
        city: form.city,
        district: form.district,
        state: form.state,
        pincode: form.pincode,
        landmark: form.landmark,
        is_default: true,
      });

      alert("Address Added Successfully");
      navigate("/checkout");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Unable to add address");
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="address-container">
        <h2>Add Delivery Address</h2>

        <form className="address-form" onSubmit={saveAddress}>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="street"
            placeholder="Door No / Street"
            value={form.street}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="Village / City"
            value={form.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="district"
            placeholder="District"
            value={form.district}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="landmark"
            placeholder="Landmark (Optional)"
            value={form.landmark}
            onChange={handleChange}
          />

          <div className="address-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/checkout")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddAddress;