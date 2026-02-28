import React from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherHome.css";

import {
  FaBook,
  FaClipboardList,
  FaPlusCircle,
  FaPenFancy,
  FaHome,
} from "react-icons/fa";

function TeacherHome() {
  const navigate = useNavigate();

  return (
    <div className="teacher-home-container">
      
      {/* 🔹 Sticky Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <h2 className="logo">Online Examination System</h2>
        </div>

        <div className="nav-right">
          <button onClick={() => navigate("/")}>
            <FaHome style={{ marginRight: "6px" }} />
            Home
          </button>

          <button onClick={() => navigate("/classes")}>
            Classes
          </button>

          <button onClick={() => navigate("/exams")}>
            Exams
          </button>

          <button className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="content">
        <h1 className="welcome-text">Welcome, Teacher 👩‍🏫</h1>

        <div className="cards-container">
          <div className="card" onClick={() => navigate("/classes")}>
            <FaBook className="card-icon" />
            <h3>Classes</h3>
            <p>View and manage your classes</p>
          </div>

          <div className="card" onClick={() => navigate("/exams")}>
            <FaClipboardList className="card-icon" />
            <h3>Exams</h3>
            <p>View and manage exams</p>
          </div>

          <div className="card" onClick={() => navigate("/CreateClass")}>
            <FaPlusCircle className="card-icon" />
            <h3>Create Class</h3>
            <p>Create a new class</p>
          </div>

          <div className="card" onClick={() => navigate("/CreateExam")}>
            <FaPenFancy className="card-icon" />
            <h3>Create Exam</h3>
            <p>Create a new exam</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default TeacherHome;