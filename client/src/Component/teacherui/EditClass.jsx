import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditClass.css";

function EditClass() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [className, setClassName] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(true);

  /* 🔹 DROPDOWN DATA */
  const branchOptions = ["CM", "EJ", "CE", "ME", "EE"];
  const yearOptions = ["First Year", "Second Year", "Third Year"];

  const semesterOptions = {
    "First Year": ["1st Sem", "2nd Sem"],
    "Second Year": ["3rd Sem", "4th Sem"],
    "Third Year": ["5th Sem", "6th Sem"],
  };

  /* ================= FETCH CLASS ================= */
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/classes/${id}`);
        const data = await res.json();

        if (!res.ok) {
          alert("Class not found");
          navigate("/Classes");
          return;
        }

        setClassName(data.className);
        setBranch(data.branch);
        setYear(data.year);
        setSemester(data.semester);
      } catch (err) {
        alert("Failed to load class");
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [id, navigate]);

  /* ================= UPDATE ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/classes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          className,
          branch,
          year,
          semester,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Update failed");
        return;
      }

      alert("Class updated successfully");
      navigate("/Classes");
    } catch (err) {
      alert("Server error");
    }
  };

  if (loading) {
    return (
      <div className="edit-class-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="edit-class-page">
      <div className="edit-class-card">
        <h2>Edit Class</h2>

        <form className="edit-class-form" onSubmit={handleUpdate}>
          <label>Class Name</label>
          <input
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />

          <label>Branch</label>
          <select
            value={branch}
            onChange={(e) => {
              setBranch(e.target.value);
              setYear("");
              setSemester("");
            }}
            required
          >
            <option value="">Select Branch</option>
            {branchOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {branch && (
            <>
              <label>Year</label>
              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  setSemester("");
                }}
                required
              >
                <option value="">Select Year</option>
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </>
          )}

          {year && (
            <>
              <label>Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                required
              >
                <option value="">Select Semester</option>
                {semesterOptions[year]?.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </>
          )}

          <button type="submit">Update Class</button>
        </form>
      </div>
    </div>
  );
}

export default EditClass;