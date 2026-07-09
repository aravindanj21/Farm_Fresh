import { useState } from "react";
import { sendOTP, verifyOTP } from "./CustomerService";
import { useNavigate } from "react-router-dom";

function OTPLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
  try {
    const res = await sendOTP({
      mobile,
    });

    
    alert(
      `OTP Sent Successfully\n\nYour OTP is: ${res.otp}`
    );

    setOtpSent(true);
  } catch (err) {
    alert(err.response?.data?.detail || "Failed to send OTP");
  }
};

  const handleVerifyOTP = async () => {
    try {
      const res = await verifyOTP({
        mobile,
        otp,
      });

      localStorage.setItem("token", res.access_token);
      localStorage.setItem(
  "customer",
  JSON.stringify(res)
);

      alert("Login Successful");

      navigate("/customer/dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Invalid OTP");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>OTP Login</h2>

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        {!otpSent ? (
          <button onClick={handleSendOTP}>
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button onClick={handleVerifyOTP}>
              Verify OTP
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default OTPLogin;

