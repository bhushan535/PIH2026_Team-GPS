import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./CreateExam.css";

function CreateExam() {
  const navigate = useNavigate();

  const [subjectName, setSubjectName] = useState("");
  const [title, setTitle] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [durationMin, setDurationMin] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      /* 1️⃣ Create Subject */
      const { data: subjectData, error: subjectError } = await supabase
        .from("subjects")
        .insert([
          {
            subject_name: subjectName,
            teacher_id: null, // temporary
          },
        ])
        .select()
        .single();

      if (subjectError) {
        alert(subjectError.message);
        setLoading(false);
        return;
      }

      /* 2️⃣ Create Exam */
      const { error: examError } = await supabase
        .from("exams")
        .insert([
          {
            subject_id: subjectData.id,
            teacher_id: null, // temporary
            title,
            scheduled_at: scheduledAt,
            duration_min: Number(durationMin),
            total_marks: Number(totalMarks),
          },
        ]);

      if (examError) {
        alert(examError.message);
        setLoading(false);
        return;
      }

      alert("Exam Created Successfully 🎉");
      navigate("/exams");

    } catch (err) {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="create-exam-page">
      <div className="exam-card">
        <h2>Create Exam</h2>

        <form onSubmit={handleSubmit} className="create-exam-form">

          <label>Subject Name</label>
          <input
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />

          <label>Exam Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Scheduled Date & Time</label>
          <input
            type="datetime-local"
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