import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { getUserRole } from "../api";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default function Login() {

  const navigate = useNavigate();

  const [roleUI, setRoleUI] = useState("admin");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const ADMIN_NUMBER = "9876543210"; 

  
  const sendOTP = async () => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" }
        );
      }

      const result = await signInWithPhoneNumber(
        auth,
        "+91" + mobile,
        window.recaptchaVerifier
      );

      setConfirmation(result);
      alert("OTP Sent");
    } catch (err) {
      alert(err.message);
    }
  };

 
  const verifyOTP = async () => {
    try {
      await confirmation.confirm(otp);

      
      if (mobile === ADMIN_NUMBER && roleUI === "admin") {
        navigate("/admin/dashboard");
        return;
      }

      
      const role = await getUserRole(mobile);

      if (role === "supplier") {
        navigate("/supplier/dashboard");
      } else if (role === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        alert("Role not found");
      }

    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="container">

      <div className="login-card">

        <h1>Multi Role Login</h1>

        
        <div className="role-buttons">
          <button onClick={() => setRoleUI("admin")}>Admin</button>
          <button onClick={() => setRoleUI("supplier")}>Supplier</button>
          <button onClick={() => setRoleUI("vendor")}>Vendor</button>
        </div>

        <input
          type="text"
          placeholder="Mobile Number"
          onChange={(e) => setMobile(e.target.value)}
        />

        <button onClick={sendOTP}>Send OTP</button>

        <input
          type="text"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={verifyOTP}>Verify OTP</button>

        <div id="recaptcha-container"></div>

      </div>

    </div>
  );
}