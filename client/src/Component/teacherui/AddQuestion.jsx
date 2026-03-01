import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddQuestion.css";

function AddQuestion() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [totalQuestionsAllowed, setTotalQuestionsAllowed] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH EXAM DETAILS ================= */
  const fetchExam = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/exams/${examId}`
      );
      const exam = await res.json();

      if (!res.ok || !exam) {
        alert("Exam not found");
        navigate("/Exams");
        return;
      }

      setTotalQuestionsAllowed(exam.totalQuestions || 0);
    } catch (err) {
      alert("Failed to load exam");
      navigate("/Exams");
    }
  };

  /* ================= FETCH QUESTIONS ================= */
  const fetchQuestions = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/questions/${examId}`
      );
      const data = await res.json();
      setQuestions(Array.isArray(data) ? data : []);
    } catch (err) {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExam();
    fetchQuestions();
  }, [examId]);

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing && questions.length >= totalQuestionsAllowed) {
      alert("Question limit reached");
      return;
    }

    if (!options.every((opt) => opt.trim() !== "")) {
      alert("All options are required");
      return;
    }

    if (!options.includes(correctAnswer)) {
      alert("Correct answer must match one of the options");
      return;
    }

    const payload = {
      examId,
      questionText,
      options,
      correctAnswer,
    };

    try {
      let url = "http://localhost:5000/api/questions";
      let method = "POST";

      if (isEditing) {
        url = `http://localhost:5000/api/questions/${editId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        alert("Operation failed");
        return;
      }

      alert(isEditing ? "Question Updated" : "Question Added");

      resetForm();
      fetchQuestions();

    } catch (err) {
      alert("Server error");
    }
  };

  /* ================= DELETE ================= */
  const deleteQuestion = async (id) => {
    const confirmDelete = window.confirm("Delete this question?");
    if (!confirmDelete) return;

    try {
      await fetch(
        `http://localhost:5000/api/questions/${id}`,
        { method: "DELETE" }
      );
      fetchQuestions();
    } catch (err) {
      alert("Delete failed");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (q) => {
    setQuestionText(q.questionText);
    setOptions(q.options);
    setCorrectAnswer(q.correctAnswer);
    setEditId(q._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setIsEditing(false);
    setEditId(null);
  };

  const isLimitReached =
    questions.length >= totalQuestionsAllowed && !isEditing;

  if (loading) {
    return (
      <div className="add-question-page">
        <h2 style={{ color: "white" }}>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="add-question-page">
      <div className="add-question-card">
        <h2>Add Questions</h2>

        <p>
          Questions Added: <b>{questions.length}</b> /{" "}
          <b>{totalQuestionsAllowed}</b>
        </p>

        {/* FORM */}
        {!isLimitReached && (
          <form onSubmit={handleSubmit} className="question-form">
            <input
              placeholder="Question"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />

            {options.map((opt, i) => (
              <input
                key={i}
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[i] = e.target.value;
                  setOptions(newOptions);
                }}
                required
              />
            ))}

            <input
              placeholder="Correct Answer (must match option)"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              required
            />

            <div className="btn-row">
              <button type="submit" className="add-btn">
                {isEditing ? "Update Question" : "Add Question"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}

        {/* DONE BUTTON */}
        {isLimitReached && (
          <button
            className="done-btn"
            onClick={() => navigate("/Exams")}
          >
            Done
          </button>
        )}

        {/* QUESTION LIST */}
        <h3 className="list-title">Added Questions</h3>

        {questions.map((q, index) => (
          <div className="question-item" key={q._id}>
            <p>
              <b>Q{index + 1}:</b> {q.questionText}
            </p>

            <ul>
              {q.options.map((op, i) => (
                <li key={i}>{op}</li>
              ))}
            </ul>

            <p className="correct">✔ {q.correctAnswer}</p>

            <div className="btn-row">
              <button
                className="edit-btn"
                onClick={() => handleEdit(q)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteQuestion(q._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default AddQuestion;