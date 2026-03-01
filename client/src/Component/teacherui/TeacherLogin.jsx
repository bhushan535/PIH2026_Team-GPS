import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherLogin.css";

function TeacherLogin() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("login"); // login | otp
  const [error, setError] = useState("");

  // 🔥 TEMPORARY FRONTEND TEST (No backend)
  const handleLogin = () => {
    setError("");
    setStep("otp"); // OTP box will show immediately
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setError("Enter valid 6 digit OTP");
      return;
    }

    // Temporary success
    localStorage.setItem("teacher", JSON.stringify({ name: userName }));
    navigate("/TeacherHome");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Teacher Login</h2>

        {/* Debug */}
        <p style={{ fontSize: "12px", opacity: 0.6 }}>
          Current Step: {step}
        </p>

        {step === "login" && (
          <>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button onClick={handleLogin}>Send OTP</button>
          </>
        )}

        {step === "otp" && (
          <>
            <div className="form-group">
              <label>Enter OTP</label>
              <input
                type="text"
                maxLength="6"
                placeholder="Enter 6 digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button onClick={handleVerifyOtp}>Verify OTP</button>
          </>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default TeacherLogin;