import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Classes.css";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 6;

  const navigate = useNavigate();

  /* ================= FETCH ================= */
  const fetchClasses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/classes");
      const data = await res.json();
      setClasses(Array.isArray(data) ? data : []);
    } catch (err) {
      setClasses([]);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  /* ================= DELETE ================= */
  const deleteClass = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/classes/${id}`, {
        method: "DELETE",
      });
      fetchClasses();
    } catch (err) {
      alert("Delete failed");
    }
  };

  /* ================= DYNAMIC FILTER OPTIONS ================= */
  const uniqueBranches = [...new Set(classes.map((c) => c.branch))];
  const uniqueSemesters = [...new Set(classes.map((c) => c.semester))];

  /* ================= FILTER LOGIC ================= */
  const filteredClasses = classes.filter((cls) => {
    return (
      cls.className.toLowerCase().includes(search.toLowerCase()) &&
      (branch === "" || cls.branch === branch) &&
      (semester === "" || cls.semester === semester)
    );
  });

  /* ================= PAGINATION ================= */
  const indexOfLast = currentPage * classesPerPage;
  const indexOfFirst = indexOfLast - classesPerPage;
  const currentClasses = filteredClasses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, branch, semester]);

  return (
    <div className="classes-page">
      <h2 className="classes-title">All Classes</h2>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by class name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option value="">All Branches</option>
          {uniqueBranches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">All Semesters</option>
          {uniqueSemesters.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* GRID */}
      {currentClasses.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No classes found</p>
      ) : (
        <div className="classes-grid">
          {currentClasses.map((cls) => (
            <div className="class-card" key={cls._id}>
              <h3>{cls.className}</h3>
              <p><b>Branch:</b> {cls.branch}</p>
              <p><b>Year:</b> {cls.year}</p>
              <p><b>Semester:</b> {cls.semester}</p>

              <div className="class-actions">
                <button
                  className="view-btn"
                  onClick={() => navigate(`/class/${cls._id}`)}
                >
                  View
                </button>

                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-class/${cls._id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteClass(cls._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Classes;