import { useNavigate } from "react-router-dom";
import "./TeacherNavbar.css";

function TeacherNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    navigate("/");
  };

  return (
    <div className="teacher-navbar">
      <div className="nav-left">
        <h3>Teacher Panel</h3>
      </div>

      <div className="nav-right">
        <button onClick={() => navigate("/TeacherHome")}>Home</button>
        <button onClick={() => navigate("/CreateExam")}>Create Exam</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default TeacherNavbar;