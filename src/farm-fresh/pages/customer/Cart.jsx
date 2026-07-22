import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import {
  getCart,
  updateCart,
  removeCartItem,
} from "../../services/CartService";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const customer = JSON.parse(localStorage.getItem("customer"));

  useEffect(() => {
    if (!customer) {
      navigate("/customer-login");
      return;
    }

    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await getCart(customer.id);

      setCart(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load cart.");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartId, type) => {
    try {
      const item = cart.find((x) => x.id === cartId);

      if (!item) return;

      let quantity = item.quantity;

      if (type === "increase") {
        quantity++;
      } else {
        if (quantity === 1) return;
        quantity--;
      }

      await updateCart(cartId, quantity);

      setCart(
        cart.map((item) =>
          item.id === cartId
            ? { ...item, quantity: quantity }
            : item
        )
      );
    } catch (error) {
      console.log(error);
      alert("Unable to update quantity.");
    }
  };

  const removeItem = async (cartId) => {
    try {
      await removeCartItem(cartId);

      setCart(cart.filter((item) => item.id !== cartId));
    } catch (error) {
      console.log(error);
      alert("Unable to remove item.");
    }
  };

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge = totalAmount > 0 ? 40 : 0;

  const grandTotal = totalAmount + deliveryCharge;

  return (
    <>
      <Header />
      <Navbar />

      <div className="cart-container">

        <h1>Shopping Cart</h1>

        {loading ? (
          <h2>Loading...</h2>
        ) : cart.length === 0 ? (
          <div className="empty-cart">

            <h2>Your Cart is Empty</h2>

            <button onClick={() => navigate("/")}>
              Continue Shopping
            </button>

          </div>
        ) : (
          <>
            <div className="cart-items">

              {cart.map((item) => (
                <div className="cart-card" key={item.id}>

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-info">

                    <h3>{item.name}</h3>

                    <p>
                      ₹ {item.price} / {item.unit}
                    </p>

                    <div className="qty-box">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            "decrease"
                          )
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            "increase"
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    <h4>
                      Subtotal : ₹
                      {item.price * item.quantity}
                    </h4>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>
              ))}

            </div>

            <div className="cart-summary">

              <h2>Cart Summary</h2>

              <p>
                Total Items
                <span>{totalItems}</span>
              </p>

              <p>
                Total Amount
                <span>₹ {totalAmount}</span>
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

              <div className="summary-buttons">

                <button
                  className="continue-btn"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>

                <button
                  className="checkout-btn"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>

              </div>

            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;