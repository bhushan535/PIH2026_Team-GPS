import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./AddQuestion.css";

function AddQuestion() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [exam, setExam] = useState(null);

  const [questionText, setQuestionText] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [marks, setMarks] = useState("");

  const [loading, setLoading] = useState(true);

  /* ================= FETCH EXAM ================= */
  const fetchExam = async () => {
    const { data, error } = await supabase
      .from("exams")
      .select("*")
      .eq("id", examId)
      .single();

    if (!error) setExam(data);
  };

  /* ================= FETCH QUESTIONS ================= */
  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("exam_id", examId);

    if (!error) setQuestions(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchExam();
    fetchQuestions();
  }, [examId]);

  /* ================= ADD QUESTION ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!exam) return;

    if (questions.length >= exam.total_questions) {
      alert("Question limit reached 🚫");
      return;
    }

    const { error } = await supabase.from("questions").insert([
      {
        exam_id: examId,
        question_text: questionText,
        option_a: optionA,
        option_b: optionB,
        option_c: optionC,
        option_d: optionD,
        correct_option: correctOption,
        marks: Number(marks),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    resetForm();
    fetchQuestions();
  };

  const resetForm = () => {
    setQuestionText("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectOption("");
    setMarks("");
  };

  if (loading) return <h2>Loading...</h2>;

  const isLimitReached =
    exam && questions.length >= exam.total_questions;

  return (
    <div className="add-question-page">
      <div className="add-question-card">
        <h2>Add Questions</h2>

        <p>
          Added: {questions.length} / {exam?.total_questions}
        </p>

        {/* FORM (only if limit not reached) */}
        {!isLimitReached && (
          <form onSubmit={handleSubmit} className="question-form">

            <input
              placeholder="Question"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />

            <input
              placeholder="Option A"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              required
            />

            <input
              placeholder="Option B"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              required
            />

            <input
              placeholder="Option C"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
              required
            />

            <input
              placeholder="Option D"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
              required
            />

            <select
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
              required
            >
              <option value="">Select Correct Option</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>

            <input
              type="number"
              placeholder="Marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              required
            />

            <button type="submit">Add Question</button>

          </form>
        )}

        {/* DONE BUTTON */}
        {isLimitReached && (
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ color: "#4caf50" }}>
              All Questions Added ✅
            </h3>

            <button
              className="done-btn"
              onClick={() => navigate("/exams")}
            >
              Done
            </button>
          </div>
        )}

        <h3 style={{ marginTop: "25px" }}>Added Questions</h3>

        {questions.map((q, index) => (
          <div key={q.id}>
            <p><b>Q{index + 1}:</b> {q.question_text}</p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default AddQuestion;