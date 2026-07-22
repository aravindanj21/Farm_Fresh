import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddAddress.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import {
  getAddresses,
  updateAddress,
} from "../../services/AddressService";

function EditAddress() {
  const { id } = useParams();
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
    is_default: false,
  });

  useEffect(() => {
    loadAddress();
  }, []);

  const loadAddress = async () => {
    try {
      const customer = JSON.parse(localStorage.getItem("customer"));

      const response = await getAddresses(customer.id);

      const address = response.data.find(
        (item) => item.id === Number(id)
      );

      if (address) {
        setForm(address);
      } else {
        alert("Address not found");
        navigate("/checkout");
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load address");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateAddressData = async (e) => {
    e.preventDefault();

    try {
      const customer = JSON.parse(localStorage.getItem("customer"));

      await updateAddress({
        id: Number(id),
        customer_id: customer.id,
        full_name: form.full_name,
        mobile: form.mobile,
        street: form.street,
        city: form.city,
        district: form.district,
        state: form.state,
        pincode: form.pincode,
        landmark: form.landmark,
        is_default: form.is_default,
      });

      alert("Address Updated Successfully");
      navigate("/checkout");
    } catch (error) {
      console.log(error);
      alert("Unable to update address");
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="address-container">
        <h2>Edit Delivery Address</h2>

        <form
          className="address-form"
          onSubmit={updateAddressData}
        >
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
            value={form.landmark || ""}
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
              Update Address
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditAddress;