import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ExamPage.css";

function ExamPage() {
  const { id } = useParams();

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = [
    {
      _id: "q1",
      question: "What is 2 + 2?",
      options: ["2", "3", "4", "5"]
    },
    {
      _id: "q2",
      question: "Which language is used for React?",
      options: ["Python", "Java", "JavaScript", "C++"]
    }
  ];

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option
    });
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", selectedAnswers);
    alert("Exam Submitted (UI Demo)");
  };

  return (
    <div className="exam-container">

      {/* Header */}
      <div className="exam-header">
        <h2>Exam ID: {id}</h2>
        <div className="timer">⏳ 60:00</div>
      </div>

      {/* Questions */}
      <div className="question-section">
        {questions.map((q, index) => (
          <div key={q._id} className="question-card">
            <h3>
              Q{index + 1}. {q.question}
            </h3>

            <div className="options">
              {q.options.map((option, i) => (
                <label key={i} className="option-item">
                  <input
                    type="radio"
                    name={q._id}
                    value={option}
                    onChange={() =>
                      handleOptionChange(q._id, option)
                    }
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Exam
        </button>
      </div>

    </div>
  );
}

export default ExamPage;