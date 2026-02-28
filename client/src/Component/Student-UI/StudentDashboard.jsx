import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ Added
import "./StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();   // ✅ Navigation Hook

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const demoExams = [
      {
        _id: "1",
        title: "Mathematics Semester Exam",
        subject: "Mathematics",
        duration: 60,
        totalMarks: 50,
        status: "available"
      },
      {
        _id: "2",
        title: "Computer Science Quiz",
        subject: "Computer Science",
        duration: 30,
        totalMarks: 30,
        status: "available"
      },
      {
        _id: "3",
        title: "Physics Mock Test",
        subject: "Physics",
        duration: 45,
        totalMarks: 40,
        status: "available"
      },
      {
        _id: "4",
        title: "Chemistry Internal Test",
        subject: "Chemistry",
        duration: 50,
        totalMarks: 50,
        status: "available"
      }
    ];

    try {
      setExams(demoExams);
      setLoading(false);
    } catch (err) {
      setError("Unable to load exams.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h2>Student Dashboard</h2>
        <p>View and attempt your available examinations</p>
      </div>

      {loading && <p className="info-text">Loading exams...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && exams.length === 0 && (
        <p className="info-text">No exams available at the moment.</p>
      )}

      <div className="exam-grid">
        {exams.map((exam) => (
          <div key={exam._id} className="exam-card">

            <h3>{exam.title}</h3>

            <div className="exam-details">
              <p><strong>Subject:</strong> {exam.subject}</p>
              <p><strong>Duration:</strong> {exam.duration} Minutes</p>
              <p><strong>Total Marks:</strong> {exam.totalMarks}</p>
            </div>

            <div className="status available">
              Available
            </div>

            {/* 🔥 Navigation Added */}
            <button
              className="start-btn"
              onClick={() => navigate(`/exam/${exam._id}`)}
            >
              Start Exam
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default StudentDashboard;