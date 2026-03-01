import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./AddQuestion.css";

function AddQuestion() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [authorized, setAuthorized] = useState(false);

  const [questionText, setQuestionText] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [marks, setMarks] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= CHECK EXAM OWNERSHIP ================= */
  const verifyOwnership = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("exams")
      .select("teacher_id")
      .eq("id", examId)
      .single();

    if (error || !data || data.teacher_id !== user.id) {
      alert("Unauthorized access");
      navigate("/exams");
      return;
    }

    setAuthorized(true);
  };

  /* ================= FETCH QUESTIONS ================= */
  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("exam_id", examId)
      .order("created_at", { ascending: false });

    if (!error) setQuestions(data || []);
    setLoading(false);
  };

  useEffect(() => {
    verifyOwnership();
    fetchQuestions();
  }, [examId]);

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correctOption) {
      alert("Select correct option");
      return;
    }

    const payload = {
      exam_id: examId,
      question_text: questionText,
      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,
      correct_option: correctOption,
      marks: Number(marks),
    };

    let response;

    if (isEditing) {
      response = await supabase
        .from("questions")
        .update(payload)
        .eq("id", editId);
    } else {
      response = await supabase
        .from("questions")
        .insert([payload]);
    }

    if (response.error) {
      alert(response.error.message);
      return;
    }

    alert(isEditing ? "Question Updated" : "Question Added");
    resetForm();
    fetchQuestions();
  };

  /* ================= DELETE ================= */
  const deleteQuestion = async (id) => {
    const confirmDelete = window.confirm("Delete this question?");
    if (!confirmDelete) return;

    await supabase.from("questions").delete().eq("id", id);
    fetchQuestions();
  };

  /* ================= EDIT ================= */
  const handleEdit = (q) => {
    setQuestionText(q.question_text);
    setOptionA(q.option_a);
    setOptionB(q.option_b);
    setOptionC(q.option_c);
    setOptionD(q.option_d);
    setCorrectOption(q.correct_option);
    setMarks(q.marks);
    setEditId(q.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setQuestionText("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectOption("");
    setMarks("");
    setIsEditing(false);
    setEditId(null);
  };

  if (loading || !authorized) {
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

        <form onSubmit={handleSubmit} className="question-form">
          <input
            placeholder="Question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />

          <input placeholder="Option A" value={optionA}
            onChange={(e) => setOptionA(e.target.value)} required />
          <input placeholder="Option B" value={optionB}
            onChange={(e) => setOptionB(e.target.value)} required />
          <input placeholder="Option C" value={optionC}
            onChange={(e) => setOptionC(e.target.value)} required />
          <input placeholder="Option D" value={optionD}
            onChange={(e) => setOptionD(e.target.value)} required />

          <select value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)} required>
            <option value="">Select Correct Option</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>

          <input type="number" placeholder="Marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)} required />

          <div className="btn-row">
            <button type="submit" className="add-btn">
              {isEditing ? "Update Question" : "Add Question"}
            </button>

            {isEditing && (
              <button type="button"
                className="cancel-btn"
                onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <h3 className="list-title">Added Questions</h3>

        {questions.map((q, index) => (
          <div className="question-item" key={q.id}>
            <p><b>Q{index + 1}:</b> {q.question_text}</p>
            <ul>
              <li>A. {q.option_a}</li>
              <li>B. {q.option_b}</li>
              <li>C. {q.option_c}</li>
              <li>D. {q.option_d}</li>
            </ul>
            <p className="correct">
              ✔ Correct: {q.correct_option} | Marks: {q.marks}
            </p>

            <div className="btn-row">
              <button className="edit-btn"
                onClick={() => handleEdit(q)}>
                Edit
              </button>
              <button className="delete-btn"
                onClick={() => deleteQuestion(q.id)}>
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