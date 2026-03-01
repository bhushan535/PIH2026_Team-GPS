import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./Exams.css";

function ExamResults() {
  const { examId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const { data } = await supabase
      .from("exam_attempts")
      .select(`
        score,
        submitted_at,
        students(name, email)
      `)
      .eq("exam_id", examId);

    setResults(data || []);
  };

  const highestScore =
    results.length > 0
      ? Math.max(...results.map((r) => r.score))
      : 0;

  const averageScore =
    results.length > 0
      ? (
          results.reduce((sum, r) => sum + r.score, 0) /
          results.length
        ).toFixed(2)
      : 0;

  return (
    <div className="exam-page">
      <h2>Exam Results</h2>

      <p><b>Total Attempts:</b> {results.length}</p>
      <p><b>Highest Score:</b> {highestScore}</p>
      <p><b>Average Score:</b> {averageScore}</p>

      <div className="exam-grid">
        {results.map((r, index) => (
          <div
            key={index}
            className={`exam-card ${
              r.score === highestScore ? "topper" : ""
            }`}
          >
            <h3>{r.students?.name}</h3>
            <p>Email: {r.students?.email}</p>
            <p>Score: {r.score}</p>
            <p>
              Submitted:{" "}
              {new Date(r.submitted_at).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExamResults;