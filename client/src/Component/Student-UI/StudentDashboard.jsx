import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const { data, error } = await supabase
      .from("exams")
      .select("*");

    if (error) {
      console.log("Error fetching exams:", error.message);
    } else {
      console.log("Exams Data:", data);  // 🔥 Check this in console
      setExams(data);
    }

    setLoading(false);
  };

  return (
    <div className="dashboard-container">
      <h2>Student Dashboard</h2>

      {loading && <p>Loading...</p>}

      {!loading && exams.length === 0 && (
        <p>No exams found</p>
      )}

      {exams.map((exam) => (
        <div key={exam.id} className="exam-card">
          <h3>{exam.title}</h3>
          <p>Duration: {exam.duration_min} min</p>
          <p>Total Marks: {exam.total_marks}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentDashboard;