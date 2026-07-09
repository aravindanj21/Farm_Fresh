import { useLocation } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "./CustomerService";

function ResetPassword() {

  const location = useLocation();

  const mobile = location.state?.mobile;

  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {

    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }

    try{

      await resetPassword({
        mobile,
        otp,
        password
      });

      alert("Password Updated");

      window.location.href="/customer-login";

    }

    catch(err){

      alert(err.response?.data?.detail || "Reset Failed");

    }

  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2>Reset Password</h2>

        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
        />

        <button onClick={handleReset}>
          Reset Password
        </button>

      </div>

    </div>

  );

}

export default ResetPassword;