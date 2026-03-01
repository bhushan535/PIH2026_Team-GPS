import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./Exams.css";

function Exams() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  /* ================= FETCH ================= */
  const fetchExams = async () => {
    const { data, error } = await supabase
      .from("exams")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setExams(data || []);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  /* ================= DELETE ================= */
  const deleteExam = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this exam?"
    );
    if (!confirmDelete) return;

    await supabase.from("exams").delete().eq("id", id);
    fetchExams();
  };

  /* ================= PUBLISH ================= */
  const publishExam = async (id) => {
    const confirmPublish = window.confirm(
      "Publish this exam?"
    );
    if (!confirmPublish) return;

    const { error } = await supabase
      .from("exams")
      .update({ is_published: true })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Exam Published ✅");
    fetchExams();
  };

  return (
    <div className="exam-page">
      <h2 className="exam-title">All Exams</h2>

      {exams.length === 0 ? (
        <p>No exams created yet</p>
      ) : (
        <div className="exam-grid">
          {exams.map((exam) => (
            <div key={exam.id} className="exam-card">

              {/* STATUS BADGE */}
              <div
                className={`status-badge ${
                  exam.is_published ? "published" : "draft"
                }`}
              >
                {exam.is_published ? "PUBLISHED" : "DRAFT"}
              </div>

              <h3>{exam.title}</h3>

              <p>
                <b>Scheduled:</b>{" "}
                {new Date(exam.scheduled_at).toLocaleString()}
              </p>

              <p><b>Duration:</b> {exam.duration_min} min</p>
              <p><b>Total Marks:</b> {exam.total_marks}</p>

              <div className="exam-btns">

                <button
                  onClick={() =>
                    navigate(`/add-question/${exam.id}`)
                  }
                  disabled={exam.is_published}
                >
                  Add Questions
                </button>

                <button
                  onClick={() =>
                    navigate(`/edit-exam/${exam.id}`)
                  }
                  disabled={exam.is_published}
                >
                  Edit
                </button>

                <button
                  onClick={() => publishExam(exam.id)}
                  disabled={exam.is_published}
                >
                  {exam.is_published
                    ? "Published"
                    : "Publish"}
                </button>

                <button
                  onClick={() => deleteExam(exam.id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Exams;