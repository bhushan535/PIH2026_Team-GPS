import { Routes, Route } from "react-router-dom";

import HomePage from "./Component/HomePage.jsx";
import AuthCallback from "./Component/Common/AuthCallback.jsx";
import StudentLogin from "./Component/Student-UI/StudentLogin.jsx";
import StudentDashboard from "./Component/Student-UI/StudentDashboard.jsx";
import TeacherOptions from "./Component/Teacher-ui/TeacherOption.jsx";
import TeacherRegister from "./Component/Teacher-ui/TeacherRegister.jsx";
import TeacherLogin from "./Component/Teacher-ui/TeacherLogin.jsx";
import TeacherHome from "./Component/Teacher-ui/TeacherHome.jsx";
import ExamPage from "./Component/Student-UI/ExamPage.jsx";
import ExamInstructions from "./Component/Student-UI/ExamInstructions.jsx";
import ExamStartCountdown from "./Component/Student-UI/ExamStartCountdown.jsx";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<HomePage />} />
      <Route path="/auth-callback" element={<AuthCallback />} />

      {/* Student */}
      <Route path="/StudentLogin" element={<StudentLogin />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/exam/:id/instructions" element={<ExamInstructions />} />
      <Route path="/exam/:examId/start" element={<ExamStartCountdown />} />
      <Route path="/attempt-exam/:id" element={<ExamPage />} />
      {/* Teacher */}
     <Route path="/teacher" element={<TeacherOptions />} />

      <Route path="/TeacherRegister" element={<TeacherRegister />} />
      <Route path="/TeacherLogin" element={<TeacherLogin />} />
      <Route path="/TeacherHome" element={<TeacherHome />} />
    </Routes>
 
  );
}

export default App;