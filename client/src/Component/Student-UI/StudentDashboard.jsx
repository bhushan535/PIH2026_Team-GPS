import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const { data, error } = await supabase
      .from("exams")
      .select("*")
      .eq("is_published", true)   // ✅ Only published exams
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error fetching exams:", error.message);
      setExams([]);
    } else {
      setExams(data || []);
    }

    setLoading(false);
  };

  const handleStartExam = (examId) => {
    if (!examId) {
      alert("Exam ID missing");
      return;
    }

    navigate(`/attempt-exam/${examId}`);   // ✅ FIXED ROUTE
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Student Dashboard</h2>
        <p>View and attempt your available examinations</p>
      </div>

      {loading && <p className="info-text">Loading...</p>}

      {!loading && exams.length === 0 && (
        <p className="info-text">No exams available.</p>
      )}

      <div className="exam-grid">
        {!loading &&
          exams.map((exam) => (
            <div key={exam.id} className="exam-card">
              <h3>{exam.title}</h3>

              <div className="exam-details">
                <p><strong>Duration:</strong> {exam.duration_min} min</p>
                <p><strong>Total Marks:</strong> {exam.total_marks}</p>
              </div>

              <button
                className="start-btn"
                onClick={() => handleStartExam(exam.id)}
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