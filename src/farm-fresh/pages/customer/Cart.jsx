import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
  }, []);

  const updateQuantity = (id, type) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        let qty = item.quantity;

        if (type === "increase") {
          qty += 1;
        } else if (qty > 1) {
          qty -= 1;
        }

        return {
          ...item,
          quantity: qty,
        };
      }

      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
    <div className="cart-container">

      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
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

                  <p>₹ {item.price}</p>

                  <div className="qty-box">

                    <button
                      onClick={() =>
                        updateQuantity(item.id, "decrease")
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, "increase")
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
                    onClick={() => removeItem(item.id)}
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
              Total Items :
              <span>{totalItems}</span>
            </p>

            <p>
              Total Amount :
              <span>₹ {totalAmount}</span>
            </p>

            <p>
              Delivery Charge :
              <span>₹ {deliveryCharge}</span>
            </p>

            <hr />

            <h3>
              Grand Total :
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
                onClick={() => alert("Checkout Module")}
              >
                Proceed to Checkout
              </button>

            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;