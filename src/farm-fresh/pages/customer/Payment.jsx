import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { placeOrder } from "../../services/OrderService";
import "./Payment.css";

function Payment() {

    const navigate = useNavigate();

    const { state } = useLocation();

    const [paymentMethod, setPaymentMethod] = useState("COD");

    if (!state) {
        return <h2>No Checkout Data</h2>;
    }

    const {
        address,
        subtotal,
        deliveryCharge,
        grandTotal,
        totalItems
    } = state;

    const handlePlaceOrder = async () => {
    try {
        const customer = JSON.parse(localStorage.getItem("customer"));

        console.log("Customer:", customer);
        console.log("Address:", address);

        const payload = {
            customer_id: customer.id,
            address_id: address.id,
            payment_method: paymentMethod
        };

        console.log("Payload:", payload);

        const response = await placeOrder({
    customer_id: customer.id,
    address_id: address.id,
    payment_method: paymentMethod
});

console.log("Success:", response.data.success);
console.log("Message:", response.data.message);
console.log("Full Response:", JSON.stringify(response.data, null, 2));

alert(JSON.stringify(response.data, null, 2));

if (!response.data.success) {
    alert(response.data.message);
    return;
}

        navigate("/order-success", {
            state: response.data
        });

    } catch (error) {
        console.log(error);
    }
};

    return (

        <>
            <Header />
            <Navbar />

            <div className="payment-container">

                <div className="payment-left">

                    <h2>Delivery Address</h2>

                    <div className="address-box">

                        <h3>{address.full_name}</h3>

                        <p>{address.mobile}</p>

                        <p>{address.street}</p>

                        <p>
                            {address.city},
                            {" "}
                            {address.district}
                        </p>

                        <p>
                            {address.state}
                            {" "}
                            -
                            {" "}
                            {address.pincode}
                        </p>

                    </div>

                    <h2>Payment Method</h2>

                    <label className="payment-option">

                        <input
                            type="radio"
                            value="COD"
                            checked={paymentMethod === "COD"}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                        />

                        Cash on Delivery

                    </label>

                    <label className="payment-option">

                        <input
                            type="radio"
                            value="Online"
                            checked={paymentMethod === "Online"}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                        />

                        Online Payment
                        (Coming Soon)

                    </label>

                </div>

                <div className="payment-right">

                    <h2>Order Summary</h2>

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

                    <p>
                        Payment
                        <span>{paymentMethod}</span>
                    </p>

                    <hr />

                    <h3>
                        Grand Total
                        <span>₹ {grandTotal}</span>
                    </h3>

                    <button
                        className="payment-btn"
                        onClick={() => {
                       console.log("Place Order clicked");
                      handlePlaceOrder();
                      }}
                    >
                        Place Order
                    </button>

                </div>

            </div>

        </>

    );

}

export default Payment;