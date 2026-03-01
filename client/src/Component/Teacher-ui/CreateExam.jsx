import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./CreateExam.css";

function CreateExam() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [durationMin, setDurationMin] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FETCH SUBJECTS (Teacher Only) ================= */
  useEffect(() => {
    const loadSubjects = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .eq("teacher_id", user.id);

      if (!error) setSubjects(data);
    };

    loadSubjects();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !subjectId || !scheduledAt || !durationMin || !totalMarks) {
      return alert("All fields required");
    }

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("exams").insert([
        {
          title,
          subject_id: subjectId,
          teacher_id: user.id,
          scheduled_at: scheduledAt,
          duration_min: Number(durationMin),
          total_marks: Number(totalMarks),
        },
      ]);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Exam created successfully");
      navigate("/exams");

    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-exam-page">
      <div className="exam-card">
        <h2>Create Exam</h2>

        <form className="create-exam-form" onSubmit={handleSubmit}>

          <label>Select Subject</label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Scheduled Date & Time</label>
          <input
            type="datetime-local"
            min={today}
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            required
          />

          <label>Duration (minutes)</label>
          <input
            type="number"
            value={durationMin}
            onChange={(e) => setDurationMin(e.target.value)}
            required
          />

          <label>Total Marks</label>
          <input
            type="number"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Exam"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateExam;