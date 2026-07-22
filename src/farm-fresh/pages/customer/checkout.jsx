import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

import {
  getAddresses,
  deleteAddress,
  setDefaultAddress,
} from "../../services/AddressService";
import { getCart } from "../../services/CartService";

function Checkout() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadAddresses();
    loadCart();
  }, []);

  const loadAddresses = async () => {
    try {
      const customer = JSON.parse(localStorage.getItem("customer"));

      const response = await getAddresses(customer.id);

      setAddresses(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const loadCart = async () => {
  try {
    const customer = JSON.parse(localStorage.getItem("customer"));

    const response = await getCart(customer.id);

    setCart(response.data);

  } catch (error) {
    console.log(error);
  }
}; 

  const selectDefault = async (addressId) => {
    try {
      const customer = JSON.parse(localStorage.getItem("customer"));

      await setDefaultAddress(
        customer.id,
        addressId
      );

      loadAddresses();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteAddressData = async (addressId) => {
    try {

      if (!window.confirm("Delete this address?"))
        return;

      await deleteAddress(addressId);

      loadAddresses();

    } catch (error) {
      console.log(error);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge =
    subtotal > 0 ? 40 : 0;

  const grandTotal =
    subtotal + deliveryCharge;

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const proceedPayment = () => {

  const defaultAddress = addresses.find(
    item => item.is_default
  );

  if (!defaultAddress) {
    alert("Please select a delivery address.");
    return;
  }

  navigate("/payment", {
    state: {
      address: defaultAddress,
      subtotal,
      deliveryCharge,
      grandTotal,
      totalItems
    }
  });

};
  return (
    <>
      <Header />
      <Navbar />

      <div className="checkout-container">

        <div className="checkout-left">

          <div className="checkout-header">

            <h2>Delivery Address</h2>

            <button
              className="add-address-btn"
              onClick={() =>
                navigate("/add-address")
              }
            >
              + Add New Address
            </button>

          </div>

          {addresses.length === 0 ? (

            <div className="no-address">

              <p>No Address Available</p>

              <button
                onClick={() =>
                  navigate("/add-address")
                }
              >
                Add Address
              </button>

            </div>

          ) : (

            addresses.map((address) => (

              <div
                key={address.id}
                className={
                  address.is_default
                    ? "address-card active"
                    : "address-card"
                }
              >

                <div className="address-top">

                  <input
                    type="radio"
                    checked={address.is_default}
                    onChange={() =>
                      selectDefault(address.id)
                    }
                  />

                  <h3>{address.full_name}</h3>

                </div>

                <p>{address.mobile}</p>

                <p>
                  {address.street}, {address.city}
                </p>

                <p>
                  {address.district},
                  {" "}
                  {address.state}
                </p>

                <p>{address.pincode}</p>

                {address.landmark && (
                  <p>
                    Landmark :
                    {" "}
                    {address.landmark}
                  </p>
                )}

                <div className="address-buttons">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(
                        `/edit-address/${address.id}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteAddressData(address.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

        <div className="checkout-right">

          <h2>Order Summary</h2>

          {cart.map((item) => (

            <div
              key={item.id}
              className="summary-item"
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div>

                <h4>{item.name}</h4>

                <p>
                  Qty : {item.quantity}
                </p>

                <p>
                  ₹ {item.price * item.quantity}
                </p>

              </div>

            </div>

          ))}

          <hr />

          <p>
            Total Items
            <span>{totalItems}</span>
          </p>

          <p>
            Subtotal
            <span>₹ {subtotal}</span>
          </p>

          <p>
            Delivery Charge
            <span>₹ {deliveryCharge}</span>
          </p>

          <hr />

          <h3>
            Grand Total
            <span>₹ {grandTotal}</span>
          </h3>

          <button
            className="payment-btn"
            onClick={proceedPayment}
          >
            Proceed to Payment
          </button>

        </div>

      </div>
    </>
  );
}

export default Checkout;
