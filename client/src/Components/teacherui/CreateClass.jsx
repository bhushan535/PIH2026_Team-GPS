import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateClass.css";

function CreateClass() {
  const navigate = useNavigate();

  const [className, setClassName] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      className,
      branch,
      year,
      semester,
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create class");
        return;
      }

      alert("Class Created Successfully");
      navigate("/Classes");

    } catch (err) {
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-class-container">
      <div className="class-card">
        <h2>Create Class</h2>

        <form onSubmit={handleSubmit}>

          <label>Class Name</label>
          <input
            placeholder="Enter Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />

          <label>Branch</label>
          <input
            placeholder="Enter Branch (e.g. Computer, Civil)"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          />

          <label>Year</label>
          <input
            placeholder="Enter Year (First, Second, Third)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />

          <label>Semester</label>
          <input
            placeholder="Enter Semester (1st, 2nd, 3rd...)"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Class"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateClass;