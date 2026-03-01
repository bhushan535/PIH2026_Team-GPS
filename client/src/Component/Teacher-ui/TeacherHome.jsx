import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./CreateExam.css";

function CreateExam() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");

  const [title, setTitle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const [loading, setLoading] = useState(false);

  /* ================= FETCH SUBJECTS ================= */
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load subjects");
    } else {
      setSubjects(data);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectId) return alert("Select subject");

    const scheduled_at = new Date(
      `${examDate}T${startTime}`
    ).toISOString();

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("exams").insert([
        {
          subject_id: subjectId,
          teacher_id: user.id,
          title,
          duration_min: Number(duration),
          total_marks: Number(totalMarks),
          scheduled_at,
        },
      ]);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Exam created successfully");
      navigate("/exams");

    } catch (err) {
      alert("Something went wrong");
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

          <label>Exam Date</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            required
          />

          <label>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />

          <label>Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
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