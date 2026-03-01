import { Routes, Route } from "react-router-dom";

import HomePage from "./Component/HomePage.jsx";
import AuthCallback from "./Component/Common/AuthCallback.jsx";
import StudentLogin from "./Component/Student-UI/StudentLogin.jsx";
import StudentDashboard from "./Component/Student-UI/StudentDashboard.jsx";
import TeacherOptions from "./Component/Teacher-ui/TeacherOption.jsx";
import TeacherRegister from "./Component/Teacher-ui/TeacherRegister.jsx";
import TeacherLogin from "./Component/Teacher-ui/TeacherLogin.jsx";
import TeacherHome from "./Component/Teacher-ui/TeacherHome.jsx";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<HomePage />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
      {/* Student */}
      <Route path="/StudentLogin" element={<StudentLogin />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />

      {/* Teacher */}
     <Route path="/teacher" element={<TeacherOptions />} />

      <Route path="/TeacherRegister" element={<TeacherRegister />} />
      <Route path="/TeacherLogin" element={<TeacherLogin />} />
      <Route path="/TeacherHome" element={<TeacherHome />} />
    </Routes>
  );
}

export default App;