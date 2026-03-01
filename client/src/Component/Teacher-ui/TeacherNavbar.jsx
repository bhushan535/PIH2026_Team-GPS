import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./TeacherNavbar.css";

function TeacherNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="teacher-navbar">
      <div className="nav-left">
        <h3>Teacher Panel</h3>
      </div>

      <div className="nav-right">
        <button onClick={() => navigate("/teacher-home")}>
          Home
        </button>

        <button onClick={() => navigate("/create-exam")}>
          Create Exam
        </button>

        <button onClick={() => navigate("/exams")}>
          Exams
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default TeacherNavbar;