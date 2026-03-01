import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendLoginOTP, verifyLoginOTP } from "../../auth/teacherAuth";
import "./TeacherLogin.css";

function TeacherLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("login"); // login | otp
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // SEND OTP
  const handleLogin = async () => {
    setError("");

    if (!email) {
      setError("Enter email");
      return;
    }

    setLoading(true);
    const res = await sendLoginOTP(email);
    setLoading(false);

    if (!res.success) {
      setError(res.message);
      return;
    }

    setStep("otp");
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    setError("");

    if (otp.length !== 6) {
      setError("Enter valid 6 digit OTP");
      return;
    }

    setLoading(true);
    const res = await verifyLoginOTP(email, otp);
    setLoading(false);

    if (!res.success) {
      setError(res.message);
      return;
    }

    localStorage.setItem("teacher", JSON.stringify(res.user));
    navigate("/TeacherHome");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Teacher Login</h2>
        <p>{step === "login" ? "Login using Email OTP" : "Enter OTP sent to your email"}</p>

        {error && <p className="error">{error}</p>}

        {step === "login" && (
          <>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button onClick={handleLogin}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
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

            <button onClick={handleVerifyOtp}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <span className="back-link" onClick={() => setStep("login")}>
              Change Email
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default TeacherLogin;