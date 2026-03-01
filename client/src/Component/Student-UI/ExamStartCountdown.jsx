import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ExamStartCountdown.css";

function ExamStartCountdown() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds === 0) {
      navigate(`/exam/${examId}`);
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, examId, navigate]);

  return (
    <div className="countdown-page">
      <div className="countdown-card">
        <h2>Exam is starting in</h2>
        <div className="countdown-circle">{seconds}</div>
        <p>Please do not refresh or navigate away.</p>
      </div>
    </div>
  );
}

export default ExamStartCountdown;