import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./CreateExam.css";

function EditExam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    scheduledAt: "",
    durationMin: "",
    totalMarks: "",
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH EXAM ================= */
  useEffect(() => {
    const fetchExam = async () => {
      try {
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

        /* 🔐 LOCK IF PUBLISHED */
        if (exam.is_published) {
          alert("Cannot edit published exam");
          navigate("/exams");
          return;
        }

        setForm({
          title: exam.title || "",
          scheduledAt: exam.scheduled_at
            ? exam.scheduled_at.slice(0, 16)
            : "",
          durationMin: exam.duration_min || "",
          totalMarks: exam.total_marks || "",
        });

      } catch (err) {
        alert("Failed to load exam");
        navigate("/exams");
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [id, navigate]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("exams")
        .update({
          title: form.title,
          scheduled_at: form.scheduledAt,
          duration_min: Number(form.durationMin),
          total_marks: Number(form.totalMarks),
        })
        .eq("id", id);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Exam updated successfully");
      navigate("/exams");

    } catch (err) {
      alert("Update failed");
    }
  };

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

        <form onSubmit={handleSubmit} className="create-exam-form">

          <label>Exam Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label>Scheduled Date & Time</label>
          <input
            type="datetime-local"
            name="scheduledAt"
            value={form.scheduledAt}
            onChange={handleChange}
            required
          />

          <label>Duration (minutes)</label>
          <input
            type="number"
            name="durationMin"
            value={form.durationMin}
            onChange={handleChange}
            required
          />

          <label>Total Marks</label>
          <input
            type="number"
            name="totalMarks"
            value={form.totalMarks}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Update Exam
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditExam;