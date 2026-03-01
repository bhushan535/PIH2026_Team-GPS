import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ExamInstructions.css";

function ExamInstructions() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

  const startExam = () => {
    navigate(`/exam/${examId}/start`);
  };

  return (
    <div className="instruction-page">
      <div className="instruction-card">

        <h2>Examination Instructions</h2>

       <ul className="instruction-list">
  <li>
    The examination will begin immediately after the countdown ends. 
    Once started, the exam cannot be paused, restarted, or resumed.
  </li>

  <li>
    The total duration of the exam is fixed. The system will automatically 
    submit your responses when the allotted time expires.
  </li>

  <li>
    Ensure you have a stable internet connection before starting the exam. 
    The institution is not responsible for interruptions caused by network or power issues.
  </li>

  <li>
    Do not refresh, close, or navigate away from the browser window during the exam. 
    Doing so may lead to automatic submission.
  </li>

  <li>
    Each question carries equal marks unless otherwise specified. 
    Only one option is correct for each question.
  </li>

  <li>
    You can navigate between questions using the Previous and Next buttons 
    before submitting the exam.
  </li>

  <li>
    Any form of malpractice, including attempting the exam on multiple devices, 
    may result in disqualification.
  </li>

  <li>
    Review your answers carefully before final submission. 
    Once submitted, changes cannot be made.
  </li>
</ul>

        <div className="agree-box">
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label htmlFor="agree">
            I have read and understood all the instructions.
          </label>
        </div>

        <button
          className="start-btn"
          disabled={!agree}
          onClick={startExam}
        >
          Start Examination
        </button>

      </div>
    </div>
  );
}

export default ExamInstructions;