import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateExam.css";

function CreateExam() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [examName, setExamName] = useState("");
  const [subject, setSubject] = useState("");
  const [subCode, setSubCode] = useState("");
  const [examDate, setExamDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const [classId, setClassId] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH CLASSES ================= */
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/classes");
        const data = await res.json();
        setClasses(data);
      } catch (err) {
        alert("Failed to load classes");
      }
    };

    fetchClasses();
  }, []);

  /* ================= CLASS SELECT ================= */
  const handleClassChange = (id) => {
    setClassId(id);

    const selectedClass = classes.find((c) => c._id === id);
    if (!selectedClass) return;

    setBranch(selectedClass.branch);
    setYear(selectedClass.year);
    setSemester(selectedClass.semester);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (startTime >= endTime) {
      alert("End time must be after start time");
      return;
    }

    const examData = {
      examName,
      classId,
      branch,
      year,
      semester,
      subject,
      subCode,
      examDate,
      startTime,
      endTime,
      totalQuestions: Number(totalQuestions),
      duration: Number(duration),
      totalMarks: Number(totalMarks),
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(examData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create exam");
        return;
      }

      alert("Exam created successfully");
      navigate("/Exams");

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

          <label>Select Class</label>
          <select
            value={classId}
            onChange={(e) => handleClassChange(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.className} ({c.branch} - {c.semester})
              </option>
            ))}
          </select>

          <label>Branch</label>
          <input value={branch} readOnly />

          <label>Year</label>
          <input value={year} readOnly />

          <label>Semester</label>
          <input value={semester} readOnly />

          <label>Exam Name</label>
          <input
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
          />

          <label>Subject Name</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <label>Subject Code</label>
          <input
            value={subCode}
            onChange={(e) => setSubCode(e.target.value)}
            required
          />

          <label>Exam Date</label>
          <input
            type="date"
            value={examDate}
            min={today}
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

          <label>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />

          <label>No. of Questions</label>
          <input
            type="number"
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(e.target.value)}
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