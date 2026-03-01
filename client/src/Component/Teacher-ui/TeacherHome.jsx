import React from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherHome.css";

function TeacherHome() {
  const navigate = useNavigate();

  return (
    <div className="teacher-home-container">
      <div className="teacher-card">
        <h2>Teacher Dashboard</h2>
        <p>Select what you want to manage</p>

        <div className="option-grid">

          <div
            className="option-card"
            onClick={() => navigate("/create-exam")}
          >
            <h3>Create Exam</h3>
            <p>Create a new examination</p>
          </div>

          <div
            className="option-card"
            onClick={() => navigate("/exams")}
          >
            <h3>Manage Exams</h3>
            <p>Edit, publish or delete exams</p>
          </div>

          <div
            className="option-card"
            onClick={() => navigate("/results")}
          >
            <h3>View Results</h3>
            <p>See student performance</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TeacherHome;