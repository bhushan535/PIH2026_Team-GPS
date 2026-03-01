import React, { useState } from "react";
import { registerTeacher } from "../../auth/teacherAuth";
import { useNavigate, Link } from "react-router-dom";
import "./TeacherRegister.css";

function TeacherRegister() {

  const navigate = useNavigate();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [msg,setMsg]=useState("");
  const [loading,setLoading]=useState(false);

  const handleRegister = async () => {

    if(!name || !email || !password){
      setMsg("All fields required");
      return;
    }

    setLoading(true);
    const res = await registerTeacher(email,password,name);
    setLoading(false);

    setMsg(res.message);

    if(res.success){
      alert("Verification email sent 📩");
      navigate("/TeacherLogin");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2>Create Teacher Account</h2>
        <p>Register to start creating exams</p>

        {msg && <div className="message">{msg}</div>}

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleRegister}>
          {loading ? "Creating..." : "Register"}
        </button>

        <span className="switch-link">
          Already have account? <Link to="/TeacherLogin">Login</Link>
        </span>

      </div>
    </div>
  );
}

export default TeacherRegister;