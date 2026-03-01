import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./ExamPage.css";

function ExamPage() {
  const { id } = useParams();   // MUST match :id
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // ===============================
  // Fetch Questions
  // ===============================
  useEffect(() => {
    if (!id) return;

    const fetchQuestions = async () => {
      console.log("Fetching exam for ID:", id);

      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("exam_id", id);   // UUID match

      if (error) {
        console.log("Error:", error.message);
        setQuestions([]);
      } else {
        console.log("Questions:", data);
        setQuestions(data || []);
      }

      setLoading(false);
    };

    fetchQuestions();
  }, [id]);

  // ===============================
  // Option Select
  // ===============================
  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    alert("Exam Submitted!");
    navigate("/");  // redirect after submit
  };

  return (
    <div className="exam-container">
      <h2>Exam</h2>

      {loading && <p>Loading questions...</p>}

      {!loading && questions.length === 0 && (
        <p>No questions found for this exam.</p>
      )}

      {!loading && questions.length > 0 && (
        <div>
          <h3>
            Q{currentIndex + 1}.{" "}
            {questions[currentIndex].question_text}
          </h3>

          {["A", "B", "C", "D"].map((opt) => (
            <div key={opt}>
              <label>
                <input
                  type="radio"
                  name={questions[currentIndex].id}
                  value={opt}
                  checked={
                    selectedAnswers[
                      questions[currentIndex].id
                    ] === opt
                  }
                  onChange={() =>
                    handleOptionChange(
                      questions[currentIndex].id,
                      opt
                    )
                  }
                />
                {
                  questions[currentIndex][
                    `option_${opt.toLowerCase()}`
                  ]
                }
              </label>
            </div>
          ))}

          <br />

          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
          >
            Next
          </button>

          <button onClick={handleSubmit}>
            Submit Exam
          </button>
        </div>
      )}
    </div>
  );
}

export default ExamPage;