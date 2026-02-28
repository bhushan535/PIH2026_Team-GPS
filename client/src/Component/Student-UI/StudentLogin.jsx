import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StudentLogin.css";

function StudentLogin() {

  const navigate = useNavigate();   // 🔥 Navigation hook

  const [formData, setFormData] = useState({
    enrollment: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.enrollment && formData.password) {
      console.log("Login Data:", formData);

      // 🔥 Navigate to Dashboard
      navigate("/student-dashboard");

    } else {
      alert("Please enter valid details");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">Student Login</h2>
        <p className="login-subtitle">
          Enter your Enrollment Number and Password
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Enrollment Number</label>
            <input
              type="text"
              name="enrollment"
              placeholder="Enter your enrollment number"
              value={formData.enrollment}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

      </div>
    </div>
  );
}

export default StudentLogin;