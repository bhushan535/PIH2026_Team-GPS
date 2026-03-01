import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./CreateExam.css";

function EditExam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    subject_id: "",
    title: "",
    examDate: "",
    startTime: "",
    duration_min: "",
    total_marks: "",
  });

  const [status, setStatus] = useState("");

  /* ================= FETCH SUBJECTS ================= */
  const fetchSubjects = async () => {
    const { data } = await supabase
      .from("subjects")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setSubjects(data);
  };

  /* ================= FETCH EXAM ================= */
  useEffect(() => {
    const fetchExam = async () => {
      const { data: exam, error } = await supabase
        .from("exams")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !exam) {
        alert("Exam not found");
        navigate("/exams");
        return;
      }

      const examDateObj = new Date(exam.scheduled_at);
      const now = new Date();

      let currentStatus = "UPCOMING";
      if (now >= examDateObj) currentStatus = "LIVE";
      if (
        now >
        new Date(
          examDateObj.getTime() + exam.duration_min * 60000
        )
      )
        currentStatus = "ENDED";

      setStatus(currentStatus);

      setForm({
        subject_id: exam.subject_id,
        title: exam.title,
        examDate: examDateObj.toISOString().slice(0, 10),
        startTime: examDateObj.toTimeString().slice(0, 5),
        duration_min: exam.duration_min,
        total_marks: exam.total_marks,
      });

      setLoading(false);
    };

    fetchSubjects();
    fetchExam();
  }, [id, navigate]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduled_at = new Date(
      `${form.examDate}T${form.startTime}`
    ).toISOString();

    const { error } = await supabase
      .from("exams")
      .update({
        subject_id: form.subject_id,
        title: form.title,
        duration_min: Number(form.duration_min),
        total_marks: Number(form.total_marks),
        scheduled_at,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Exam Updated Successfully");
    navigate("/exams");
  };

  const isLocked = status === "LIVE" || status === "ENDED";

  if (loading) {
    return (
      <div className="create-exam-page">
        <h2 style={{ color: "white" }}>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="create-exam-page">
      <div className="exam-card">
        <h2>Edit Exam</h2>

        {isLocked && (
          <p style={{ color: "#ff5252", fontWeight: "bold" }}>
            This exam cannot be edited (Status: {status})
          </p>
        )}

        <form onSubmit={handleSubmit} className="create-exam-form">

          <label>Select Subject</label>
          <select
            name="subject_id"
            value={form.subject_id}
            onChange={handleChange}
            disabled={isLocked}
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.subject_name} ({s.subject_code})
              </option>
            ))}
          </select>

          <label>Exam Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={isLocked}
            required
          />

          <label>Exam Date</label>
          <input
            type="date"
            name="examDate"
            value={form.examDate}
            onChange={handleChange}
            disabled={isLocked}
            required
          />

          <label>Start Time</label>
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            disabled={isLocked}
            required
          />

          <label>Duration (minutes)</label>
          <input
            type="number"
            name="duration_min"
            value={form.duration_min}
            onChange={handleChange}
            disabled={isLocked}
            required
          />

          <label>Total Marks</label>
          <input
            type="number"
            name="total_marks"
            value={form.total_marks}
            onChange={handleChange}
            disabled={isLocked}
            required
          />

          {!isLocked && (
            <button type="submit">Update Exam</button>
          )}

        </form>
      </div>
    </div>
  );
}

export default EditExam;