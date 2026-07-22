import { useLocation, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {

    const navigate = useNavigate();

    const { state } = useLocation();

    if (!state) {
        return <h2>No Order Found</h2>;
    }

    const address = state.address;

if (!address) {
    return <h2>Address not found.</h2>;
}

    return (

        <div className="success-page">

            <h1>🎉 Order Placed Successfully</h1>

            <h3>Order ID</h3>
           <p>{state.order_id}</p>

            <h3>Order Date</h3>
            <p>{state.order_date}</p>

            <h3>Delivery Address</h3>

            <p>
                {state.address.full_name}
            </p>

            <p>
                {state.address.street}
            </p>

            <p>
                {state.address.city},
                {" "}
                {state.address.district}
            </p>

            <p>
                {state.address.state}
                {" "}
                -
                {" "}
                {state.address.pincode}
            </p>

            <h3>Payment</h3>

           <p>{state.payment_method}</p>
           
            <h3>Status</h3>

            <p>{state.status}</p>

            <button
                onClick={() =>
                    navigate("/customer-home")
                }
            >
                Continue Shopping
            </button>

        </div>

    );
}

export default OrderSuccess;