import { useState } from "react";
import { sendForgotOTP } from "./CustomerService";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");

  const handleSend = async () => {
  try {
    const res = await sendForgotOTP({ mobile });

    alert(
      `OTP Sent Successfully\n\nYour OTP is: ${res.otp}`
    );

    navigate("/reset-password", {
      state: { mobile },
    });

  } catch (err) {
    alert(err.response?.data?.detail || "Failed");
  }
};

  return (

    <div className="login-container">

      <div className="login-box">

        <h2>Forgot Password</h2>

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
        />

        <button onClick={handleSend}>
          Send OTP
        </button>

      </div>

    </div>

  );

}

export default ForgotPassword;