import React, { useEffect, useState } from "react";
import "./Exams.css";
import { FaBookOpen, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= FETCH EXAMS ================= */
  const fetchExams = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("exams")
      .select("*, subjects(subject_name)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
      setExams([]);
    } else {
      setExams(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  /* ================= STATUS ================= */
  const getStatus = (exam) => {
    const now = new Date();
    const scheduled = new Date(exam.scheduled_at);

    if (!exam.scheduled_at) return "DRAFT";

    if (now < scheduled) return "UPCOMING";

    const end = new Date(
      scheduled.getTime() + exam.duration_min * 60000
    );

    if (now >= scheduled && now <= end) return "LIVE";

    return "ENDED";
  };

  /* ================= DELETE ================= */
  const deleteExam = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this exam?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("exams")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete failed");
    } else {
      fetchExams();
    }
  };

  return (
    <div className="exam-page">
      <h2 className="exam-title">
        <FaBookOpen /> All Exams
      </h2>

      {loading ? (
        <p>Loading exams...</p>
      ) : exams.length === 0 ? (
        <p className="no-exam">No exams created yet</p>
      ) : (
        <div className="exam-grid">
          {exams.map((exam) => {
            const status = getStatus(exam);

            return (
              <div className="exam-card" key={exam.id}>
                <div className={`status-badge ${status.toLowerCase()}`}>
                  {status}
                </div>

                <h3>{exam.title}</h3>

                <p>
                  <b>Subject:</b>{" "}
                  {exam.subjects?.subject_name}
                </p>

                <p>
                  <b>Scheduled:</b>{" "}
                  {new Date(exam.scheduled_at).toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p>
                  <b>Duration:</b> {exam.duration_min} minutes
                </p>

                <p>
                  <b>Total Marks:</b> {exam.total_marks}
                </p>

                <div className="exam-btns">
                  <button
                    className="edit-btn"
                    disabled={
                      status === "LIVE" || status === "ENDED"
                    }
                    onClick={() =>
                      navigate(`/edit-exam/${exam.id}`)
                    }
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    className="delete-btn"
                    disabled={status === "LIVE"}
                    onClick={() => deleteExam(exam.id)}
                  >
                    <FaTrash /> Delete
                  </button>

                  <button
                    className="add-btn"
                    disabled={status !== "DRAFT"}
                    onClick={() =>
                      navigate(`/add-question/${exam.id}`)
                    }
                  >
                    <FaPlus /> Add Questions
                  </button>

                  <button
                    className="result-btn"
                    onClick={() =>
                      navigate(`/exam-attempts/${exam.id}`)
                    }
                  >
                    View Attempts
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Exams;